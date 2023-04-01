import express from "express";
import {
  createNewTask,
  deleteTask,
  myTask,
  updateTask,
} from "../controller/task.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, createNewTask);
router.route("/my").get(isAuthenticated, myTask);
router
  .route("/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

export default router;
