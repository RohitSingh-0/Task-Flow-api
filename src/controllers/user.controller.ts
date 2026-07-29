import { userService } from "../services/user.service.js"
import type { Request, Response } from "express";

export const userController = {
    async createUser(req: Request, res: Response) {
        try {
            const userData = req.body;
            const newUserCreated = await userService.createUser(userData);
            res.status(201).send(newUserCreated)
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).send(error.message)
            } else {
                res.status(500).send("Internal Server Error");
            }

        }
    }
}