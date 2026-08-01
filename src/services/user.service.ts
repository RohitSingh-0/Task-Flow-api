import { userRepository } from "../repositories/user.repository.js";
import type { Login, UserType } from "../types/user.types.js";
import { isPasswordValid, isValidEmail } from "../utilities/validation.js";
import { AppError } from "../errors/AppError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userService = {
    async createUser(userData: UserType): Promise<UserType> {

        if (!userData.name) {
            throw new AppError("Name is required", 400);
        }
        if (!userData.email) {
            throw new AppError("Email is required", 400)
        }
        if (!userData.password) {
            throw new AppError("Password is required.", 400)
        }

        if (!isValidEmail(userData.email)) {
            throw new AppError("Invalid Email Format", 400)
        }
        if (!isPasswordValid(userData.password)) {
            throw new AppError("Password must contain at least 8 characters, one uppercase letter, one lowercase letter,one number and one special character", 400)
        }

        if (!userData.role) {
            throw new AppError("Role is required", 400)
        }

        const validRoles = ["Admin", "Manager", "Employee"];
        if (!validRoles.includes(userData.role)) {
            throw new AppError("Role must be Admin, Manager or Employee", 400);
        }


        if (userData.isActive === undefined) {
            throw new AppError("isActive is required", 400)
        }

        const isUserExist = await userRepository.findByEmail(userData.email)

        if (isUserExist) {
            throw new AppError("User Already Exists", 409);
        }
        const hashedPassword = await bcrypt.hash(userData.password, 10)
        userData.password = hashedPassword;

        const userCreated = await userRepository.createUser(userData);
        return userCreated;

    },

    async login(loginDetail: Login) {
        const { email, password } = loginDetail
        const user = await userRepository.findByEmail(email)
        if (!user) {
            throw new AppError("Invalid email or password", 401);
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw new AppError("Invalid email or password", 401);
        }

        const token = jwt.sign(
            { "userId": user._id },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "1h"
            }
        )
        return token;
    },

    async getUserById(id: string) {
        const userId = await userRepository.findById(id)
        if (!userId) {
            throw new AppError("Unauthorized", 401);
        }
        return userId;
    }
}