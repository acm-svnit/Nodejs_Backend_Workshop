const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  branch: String,
});

module.exports = mongoose.model("Table", tableSchema);
