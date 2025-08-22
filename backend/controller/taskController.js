// const mongoose = require("mongoose");

const TaskSchema = require("../models/task.js");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskSchema.find({});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTask = async (req, res) => {
  console.log("POST /tasks called", req.body);

  const { title } = req.body;
  if (!title) {
    return res.status(400).json({
      error: "Title is required",
      message: "Failed to create task. Please provide a title.",
    });
  }
  try {
    const task = await TaskSchema.create({ title });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message:
        "Failed to create task. Please ensure all required fields are provided.",
    });
  }
};

const updateTask = async (req, res) => {
  console.log("PUT /tasks/:id called", req.body);
  const { id } = req.params;
  const { title, completed } = req.body;

  try {
    const task = await TaskSchema.findByIdAndUpdate(
      id,
      { title, completed },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await TaskSchema.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  TaskSchema, // Export the TaskSchema if needed elsewhere
};
