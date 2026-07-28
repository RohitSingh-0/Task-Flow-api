import mongoose from "mongoose";

const userSchema = new mongoose.Schema ({
    name: { type: String, required: true },
    email:  { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    profileImage: String,
    isActive: { type: Boolean, required: true },
    createdBy: { type: String, required: true }
});

export const User = mongoose.model("User", userSchema)