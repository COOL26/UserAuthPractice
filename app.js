const express = require("express");
const path = require("path");
const app = express();

app.set("views", path.join(__dirname, "views")); // for letting the ejs know where our .ejs files are stored.
app.set("view engine", "ejs"); // for establishing the connection between ejs and web server

app.use(express.static("public")); // for serving the static CSS and JS files

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000);
