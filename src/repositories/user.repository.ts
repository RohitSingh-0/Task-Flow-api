import { User } from "../models/user.model.js"
import type { UserEmail, UserType } from "../types/user.types.js";

export const userRepository = {

    async findByEmail(email: string) {
        const isUserExist = await User.findOne({email: email})
        return isUserExist;
    },

    async createUser(userData: UserType) {
        const createdUser = await User.create(userData);
        return createdUser;
    },
    async findById(id: string) {
        const user = await User.findById(id)
        return user;
    }
}