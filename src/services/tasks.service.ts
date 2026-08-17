import { Role, Status, Priority } from "../constants/role.js";
import { AppError } from "../errors/AppError.js";
import { taskRepository } from "../repositories/task.repository.js";
import type { CreateTaskInput, TaskType, UpdateTask } from "../types/task.types.js";
import type { AuthenticatedUser, AuthTokenPayload } from "../types/user.types.js";
import { Types } from "mongoose";

export const taskService = {

    async createTask(authenticatedUser: AuthenticatedUser, taskData: CreateTaskInput) {
        if (!taskData.title) {
            throw new AppError("title is required", 400)
        }

        const validPriority = ["Low", "Medium", "High"]
        if (!validPriority.includes(taskData.priority)) {
            throw new AppError("Priority must be Low , Medium , High", 400)
        }

        const task: TaskType = {
            title: taskData.title,
            priority: taskData.priority,
            status: Status.Pending,
            createdBy: new Types.ObjectId(authenticatedUser._id)
        };

        if (taskData.assignedTo) {
            task.assignedTo = new Types.ObjectId(taskData.assignedTo);
        }

        const taskCreated = await taskRepository.createTask(task);
        return taskCreated
    },

    async getAllTasks() {
        const allTasks = await taskRepository.getAllTasks()
        return allTasks
    },

    async getMyTasks(employeeId: string) {

        const myTasks = await taskRepository.getMyTasks(employeeId);
        return myTasks;
    },

    async updateTask(authenticatedUser: AuthenticatedUser, targetTaskId: string, updateData: UpdateTask) {

        const targetTask = await taskRepository.findById(targetTaskId);

        if (!targetTask) {
            throw new AppError("Task not found", 404);
        }

        const updateKeys = Object.keys(updateData);

        if (updateKeys.length === 0) {
            throw new AppError("No fields provided for update", 400);
        }

        if (
            authenticatedUser.role === Role.Admin ||
            authenticatedUser.role === Role.Manager
        ) {

            const allowedFields = ["title", "priority", "assignedTo", "status"];

            const invalidField = updateKeys.find(
                (key) => !allowedFields.includes(key)
            );

            if (invalidField) {
                throw new AppError(`${invalidField} cannot be updated`, 403);
            }

            if (
                updateData.title !== undefined &&
                !updateData.title.trim()
            ) {
                throw new AppError("Empty title not allowed", 400
                );
            }

            if (
                updateData.priority !== undefined &&
                !Object.values(Priority).includes(updateData.priority)
            ) {
                throw new AppError("Invalid priority", 400);
            }

            if (
                updateData.status !== undefined &&
                !Object.values(Status).includes(updateData.status)
            ) {
                throw new AppError("Invalid status", 400);
            }

            const updatedTask = await taskRepository.updateTask(targetTaskId, updateData);
            return updatedTask;
        }

        if (authenticatedUser.role === Role.Employee) {

            const allowedFields = ["status"];

            const invalidField = updateKeys.find((key) => !allowedFields.includes(key));

            if (invalidField) {
                throw new AppError(`Employee cannot update ${invalidField}`, 403);
            }

            if (
                updateData.status !== undefined &&
                !Object.values(Status).includes(updateData.status)
            ) {
                throw new AppError("Invalid status", 400);
            }

            if (
                !targetTask.assignedTo || targetTask.assignedTo.toString() !== authenticatedUser._id
            ) {
                throw new AppError("You can only update your assigned tasks", 403);
            }

            const updatedTask = await taskRepository.updateTask(targetTaskId, updateData);
            return updatedTask;
        }

        throw new AppError("Invalid user role", 403);
    }
}