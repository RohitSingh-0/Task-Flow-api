import type { Types } from "mongoose";
import type { Priority, Status } from "../constants/role.js";

export type TaskType = {
    title: string;
    priority: Priority;
    status: Status;
    assignedTo?: Types.ObjectId;
    createdBy: Types.ObjectId;
};

export type CreateTaskInput = {
    title: string;
    priority: Priority;
    assignedTo?: string;
};

export type UpdateTask = {
    title?: string;
    priority?: Priority;
    assignedTo?: string;
    status?: Status
}