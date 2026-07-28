import express from "express";
import userRouter from "./routes/user.route.js";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/users", userRouter);

export default app;