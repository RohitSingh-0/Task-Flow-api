import express from "express";
import cors from "cors"
import userRouter from "./routes/user.route.js";
import taskRouter from "./routes/task.router.js"
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
    })
);

// Middleware
app.use(express.json());

// Routes
app.use("/users", userRouter);
app.use("/tasks", taskRouter)
app.use(errorHandler);

export default app;