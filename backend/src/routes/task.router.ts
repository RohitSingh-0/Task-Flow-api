import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";
import { Role } from "../constants/role.js";
import { taskController } from "../controllers/tasks,controller.js";
import { taskService } from "../services/tasks.service.js";

const router = express.Router();

router.post("/", authMiddleware, authorize(Role.Admin, Role.Manager), taskController.createTask);
router.get("/", authMiddleware, authorize(Role.Admin, Role.Manager), taskController.getAllTasks);
router.get("/my", authMiddleware, authorize(Role.Employee), taskController.getMyTasks);
router.patch("/:id", authMiddleware, authorize(Role.Admin, Role.Manager, Role.Employee), taskController.updateTask)
router.delete("/:id", authMiddleware, authorize(Role.Admin), taskController.deletedTask)

export default router