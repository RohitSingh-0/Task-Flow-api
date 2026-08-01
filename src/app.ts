import express from "express";
import router from "./routes/user.route.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/users", router);
app.use("/users", router);
app.use(errorHandler);

export default app;