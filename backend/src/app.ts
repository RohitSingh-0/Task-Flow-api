import express from "express";
import userRouter from "./routes/user.route.js";
import taskRouter from "./routes/task.router.js"
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/users", userRouter);
app.use("/tasks", taskRouter)
app.use(errorHandler);

export default app;