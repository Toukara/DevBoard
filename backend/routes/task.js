const express = require("express");

const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask, // Export the TaskSchema if needed elsewhere
} = require("../controller/taskController.js");

const router = express.Router();

router.get("/", getAllTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
