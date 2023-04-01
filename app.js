import express, { urlencoded } from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import cookieParser from "cookie-parser";
import cors from "cors";
export const app = express();
import { config } from "dotenv";
import { errorMiddleware } from "./middleware/error.js";
config({
  path: "./config/.env",
});

// using middleware
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// using routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);

// using error middleware
app.use(errorMiddleware);
