// task controller
const Task = require("../models/Task");
//for get all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
//add tasks
const addTask = async (req, res) => {
  try {
    const { title } = req.body;
    const task = new Task({ title, user: req.user.id });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
//update tasks
const updateTask = async (req, res) => {
  try {
    let task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.title = req.body.title || task.title;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
//delete tasks
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// expoting
module.exports = { getTasks, addTask, updateTask, deleteTask };
