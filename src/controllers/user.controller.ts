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
    }
}