const express = require("express");
const path = require("path");
const app = express();

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

app.post("/signUp", (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  console.log(username);
  console.log(email);
  console.log(password);
  res.redirect("/");
});

app.listen(3000);
