import mongoose from "mongoose";
import { Priority, Status } from "../types/task.types.js";


const taskSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    priority: { type: String, enum: Object.values(Priority), required: true },
    status: { type: String, enum: Object.values(Status), default: Status.Pending, required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, {
    timestamps: true
})

const Task = new mongoose.Model("Task", taskSchema);