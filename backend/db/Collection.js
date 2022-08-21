const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  starttime: String,
  endtime: String,
  priority: String,
  status: String,
  userId: String,
});

module.exports = mongoose.model("tasks", taskSchema);
