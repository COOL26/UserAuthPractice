const express = require("express");
const path = require("path");
const app = express();
const bcrypt = require("bcryptjs");

const db = require("./data/database"); // connection of this server to mongodb db.

app.use(express.urlencoded({ extended: false })); // for parsing user form data (text)

app.set("views", path.join(__dirname, "views")); // for letting the ejs know where our .ejs files are stored.
app.set("view engine", "ejs"); // for establishing the connection between ejs and web server

app.use(express.static("public")); // for serving the static CSS and JS files

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

app.post("/signIn", (req, res) => {});

db.connectToDatabase().then(function () {
  app.listen(3000);
});
