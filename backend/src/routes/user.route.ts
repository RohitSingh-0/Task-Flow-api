import express from "express";
import { userController } from "../controllers/user.controller.js";
import { authMiddleware }  from "../middleware/auth.middleware.js"
import { authorize } from "../middleware/authorize.middleware.js"
import { Role } from "../constants/role.js";

const router = express.Router();
router.post("/register", userController.createUser);
router.post("/login", userController.login);
router.delete("/:id",authMiddleware, authorize(Role.Admin), userController.deleteUser);
router.get("/:id", authMiddleware, authorize(Role.Admin), userController.getUser);
router.get("/", authMiddleware, authorize(Role.Admin, Role.Manager), userController.getAllUser);
router.patch("/:id", authMiddleware, authorize(Role.Admin, Role.Manager, Role.Employee), userController.update)

export default router;