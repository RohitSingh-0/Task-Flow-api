import mongoose from "mongoose";
import { Role } from "../constants/role.js";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), required: true },
    profileImage: String,
    isActive: { type: Boolean, required: true },
    createdBy: { type: String, required: true }
});

export const User = mongoose.model("User", userSchema)