import { Task } from "../models/task.model.js";
import type { TaskType, UpdateTask } from "../types/task.types.js";

export const taskRepository = {

    async createTask(task: TaskType) {
        const taskCreated = await Task.create(task)
        return taskCreated;
    },

    async getAllTasks() {
        const allTasks = await Task.find()
        return allTasks;
    },

    async getMyTasks(employeeId: string) {

        const myTasks = await Task.find({
            assignedTo: employeeId
        });

        return myTasks;
    },

    async findById(taskId: string) {
        const task = await Task.findById(taskId);
        return task;
    },

    async updateTask(
        taskId: string,
        updateData: UpdateTask
    ) {
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );

        return updatedTask;
    }
}
