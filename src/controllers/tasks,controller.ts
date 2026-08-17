import type { Request, Response } from "express";
import { taskService } from "../services/tasks.service.js"
import { Status } from "../constants/role.js";
import { AppError } from "../errors/AppError.js";


export const taskController = {
    async createTask(req: Request, res: Response) {

        const createdTask = await taskService.createTask(req.user, req.body);

        res.status(201).json({
            message: "Task created successfully",
            createdTask
        });
    },

    async getAllTasks(req: Request, res: Response) {
        const allTasks = await taskService.getAllTasks()
        res.status(200).json({
            message: "Successfully find all tasks",
            allTasks
        })
    },

    async getMyTasks(req: Request, res: Response) {

        const employeeId = req.user._id;
        const myTasks = await taskService.getMyTasks(employeeId);

        res.status(200).json({
            message: "Tasks fetched successfully",
            myTasks
        });
    },

    async updateTask(req: Request, res: Response) {

        const targetTaskId = req.params.id;

        if (!targetTaskId || Array.isArray(targetTaskId)) {
            throw new AppError("Invalid task ID", 400);
        }

        const authenticatedUser = req.user;
        const updateData = req.body;

        const updatedTask = await taskService.updateTask(authenticatedUser, targetTaskId, updateData);

        res.status(200).json({
            message: "Task updated successfully",
            updatedTask
        });
    }
}