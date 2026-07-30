import { userService } from "../services/user.service.js"
import type { Request, Response } from "express";
import { AppError } from "../errors/AppError.js";

export const userController = {
    async createUser(req: Request, res: Response) {
        const userData = req.body;
        const newUserCreated = await userService.createUser(userData);
        res.status(201).send(newUserCreated)
    }
}