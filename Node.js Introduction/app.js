const express = require("express");
const app = express();

//init Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

//define routes
app.get("/", (req, res) => {
  // res.send("Hello World");
  res.render("index");
});

//create server
const PORT = 3000;
app.listen(PORT, () => console.log("Server has started"));
