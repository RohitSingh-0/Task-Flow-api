import { User } from "../models/user.model.js"
import type { UserType } from "../types/user.types.js";

export const userRepository = {
    async createUser(userData: UserType) {
        const createdUser = await User.create(userData);
        return createdUser;
    }
}