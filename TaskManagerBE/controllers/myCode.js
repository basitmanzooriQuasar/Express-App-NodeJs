const Task = require("../model/taskModel");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({
      status: "success",
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    res.status(200).json({
      status: "success",
      message: "Task fetched successfully",
      data: task,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({
      status: "success",
      message: "Task created successfully",
      data: task,
    });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};
const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findByIdAndUpdate({ _id: taskID }, req.body);
    res.status(200).json({
      status: "success",
      message: "Task updated successfully",
      task: req.body,
    });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};
const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findByIdAndDelete({ _id: taskID });
    res.status(200).json({
      status: "success",
      message: "Task deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};
module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
