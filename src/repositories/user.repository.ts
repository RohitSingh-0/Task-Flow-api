import { User } from "../models/user.model.js"
import type { UserEmail, UserType } from "../types/user.types.js";
import { Role } from "../constants/role.js";

export const userRepository = {

    async findByEmail(email: string) {
        const isUserExist = await User.findOne({ email: email })
        return isUserExist;
    },

    async createUser(userData: UserType) {
        const createdUser = await User.create(userData);
        return createdUser;
    },
    async findById(id: string) {
        const user = await User.findById(id).select("-password")
        return user;
    },
    async countByRole(role: Role) {
        const userCount = await User.countDocuments({ role })
        return userCount;
    },
    async deleteUser(targetUSerId: string) {
        const deletedUser = await User.findByIdAndDelete(targetUSerId)
        return deletedUser;
    }
}