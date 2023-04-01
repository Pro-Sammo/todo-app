import ErrorHandler from "../middleware/error.js";
import { Task } from "../models/task.js";

export const createNewTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    await Task.create({ title, description, user: req.user });
    res.status(201).json({
      success: true,
      message: "Task added Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const myTask = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.status(201).json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return next(new ErrorHandler("Task not found", 404));
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(201).json({
      success: true,
      message: "Task Updated",
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return next(new ErrorHandler("Task not found", 404));
    res.status(201).json({
      success: true,
      message: "Task Deleted",
    });
  } catch (error) {
    console.log(error);
  }
};
