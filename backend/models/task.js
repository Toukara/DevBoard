const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  id: mongoose.Schema.ObjectId,
  title: String,
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
