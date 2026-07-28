import { userRepository } from "../repositories/user.repository.js";
import type { UserType } from "../types/user.types.js";

export const userService = {
    async createUser(userData: UserType): Promise<UserType> {
    const userCreated = await userRepository.createUser(userData);
    return userCreated;
}
}