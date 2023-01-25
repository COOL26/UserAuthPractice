const express = require("express");
const path = require("path");
const app = express();
const bcrypt = require("bcryptjs");
const session = require("express-session"); // for establishing server side sessions
const mongodbStore = require("connect-mongodb-session"); // for connecting mongodb database to the sessions, so that it can store sessions of the users(incoming request).

const db = require("./data/database"); // connection of this server to mongodb db.

app.use(express.urlencoded({ extended: false })); // for parsing user form data (text)

app.set("views", path.join(__dirname, "views")); // for letting the ejs know where our .ejs files are stored.
app.set("view engine", "ejs"); // for establishing the connection between ejs and web server

app.use(express.static("public")); // for serving the static CSS and JS files

const MongodbStore = mongodbStore(session); // buidling connection between mongodb and sessions

const sessionStore = new MongodbStore({
  uri: "mongodb://127.0.0.1:27017",
  databaseName: "auth-demo",
  collection: "sessions",
});

app.use(
  session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/signUp", (req, res) => {
  res.render("signUp");
});

app.post("/signUp", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  if (password.trim() < 6) {
    console.log("password length is too short and spaces are not allowed!");
    return res.redirect("/signUp");
  }

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: email });

  if (existingUser) {
    console.log("user already exist please signIn");
    return res.redirect("/signUp");
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = {
    email: email,
    password: hashedPassword,
  };

  await db.getDb().collection("users").insertOne(user);

  res.redirect("/signIn");
});

app.get("/signIn", (req, res) => {
  res.render("signIn");
});

app.post("/signIn", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: email });

  if (!existingUser) {
    // checking if the user exist in our db or not
    alert("User already exist please signIn");
    return res.redirect("/signIn");
  }
  const isEqual = await bcrypt.compare(password, existingUser.password);
  if (!isEqual) {
    alert("Incorrect Password");
    return res.redirect("/signIn");
  }
  alert("User is authenticated!");
  res.redirect("/");
});

db.connectToDatabase().then(function () {
  app.listen(3000);
});
