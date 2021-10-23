const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Table = require("./models/Table");

// Initialise Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

// Connect Database
mongoose
  .connect("YOUR_MONGODB_URI", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("ERROR", err.message);
  });

// Define Routes
app.get("/", (req, res) => {
  Table.find((err, details) => {
    if (err) console.log(err);
    else {
      // res.send(details);
      res.render("home", { details });
    }
  });
});

app.get("/new", (req, res) => {
  res.render("new_entry");
});

app.post("/new", async (req, res) => {
  const entry = new Table({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    branch: req.body.branch,
  });

  try {
    await entry.save();
    res.redirect("/");
  } catch (err) {
    return res.redirect("/");
  }
});

app.get("/edit/:id", (req, res) => {
  Table.findById(req.params.id, (err, details) => {
    if (err) console.log(err);
    else {
      res.render("edit_entry", { details });
    }
  });
});

app.post("/edit/:id", (req, res) => {
  Table.findByIdAndUpdate(req.params.id, req.body, (err, details) => {
    if (err) console.log(err);
    else {
      res.redirect("/");
      // res.send(details);
    }
  });
});

app.get("/delete/:id", (req, res) => {
  Table.findByIdAndDelete(req.params.id, (err, details) => {
    if (err) console.log(err);
    else {
      res.redirect("/");
      // res.send(details);
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
