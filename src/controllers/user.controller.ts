import { userService } from "../services/user.service.js"
import type { Request, Response } from "express";
import { AppError } from "../errors/AppError.js";

export const userController = {
    async createUser(req: Request, res: Response) {
        const userData = req.body;
        const newUserCreated = await userService.createUser(userData);
        res.status(201).send(newUserCreated)
    },

    async login(req: Request, res: Response) {
        const login = req.body
        const userLoggedIn = await userService.login(login);
        res.status(200).json({
            message: "Login successful",
            userLoggedIn
        });
    },

    async deleteUser(req: Request, res: Response) {
        const targetUserId = req.params.id;

        if (!targetUserId || Array.isArray(targetUserId)) {
            throw new AppError("Invalid user ID", 400);
        }
        const authenticatedUserId: string = req.user._id;
        const deletedUser = await userService.deleteUser(targetUserId, authenticatedUserId);
        res.status(200).json({
            message: "User deleted successfully",
            deletedUser
        });
    },

    async getUser(req: Request, res: Response) {
        const targetUserId = req.params.id;

        if(!targetUserId || Array.isArray(targetUserId)) {
            throw new AppError("Invalid user ID", 400);
        }

        const findUser =  await userService.getUserById(targetUserId)
        res.status(200).json({
            message : "User find successfully",
            findUser
        })
    }
}