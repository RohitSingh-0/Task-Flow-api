import { userRepository } from "../repositories/user.repository.js";
import type { UserType } from "../types/user.types.js";
import { isPasswordValid, isValidEmail } from "../utilities/validation.js";
import { AppError } from "../errors/AppError.js";

export const userService = {
    async createUser(userData: UserType): Promise<UserType> {

        if (!userData.name) {
            throw new Error("name is required");
        }
        if (!userData.email) {
            throw new Error("email is required")
        }
        if (!userData.password) {
            throw new Error("Password is required.")
        }
        
        if (!isValidEmail(userData.email)) {
            throw new Error("Invalid Email Format")
        }
        if (!isPasswordValid(userData.password)) {
            throw new Error("Password must contain at least 8 characters, one uppercase letter, one lowercase letter,one number and one special character")
        }

        if (!userData.role) {
            throw new Error("Role is required")
        }

        const validRoles = ["Admin", "Manager", "Employee"];
        if (!validRoles.includes(userData.role)) {
            throw new Error("Role must be Admin, Manager or Employee");
        }


        if (userData.isActive === undefined) {
            throw new Error("isActive is required")
        }

        const isUserExist = await userRepository.findByEmail(userData.email)
        
        if (isUserExist) {
            throw new AppError("User Already Exists", 409);
        }

        const userCreated = await userRepository.createUser(userData);
        return userCreated;

    }
}