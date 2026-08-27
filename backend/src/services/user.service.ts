import { userRepository } from "../repositories/user.repository.js";
import type { Login, UserType, AuthenticatedUser } from "../types/user.types.js";
import { isPasswordValid, isValidEmail } from "../utilities/validation.js";
import { AppError } from "../errors/AppError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Role } from "../constants/role.js";
import { resolvePtr } from "dns";

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
            throw new AppError("User not found", 404);
        }
        return userId;
    },

    async deleteUser(targetUserId: string, authenticateUserId: string) {
        if (targetUserId === authenticateUserId) {
            throw new AppError("You cannot delete your own account", 403);
        }

        const targetUser = await userRepository.findById(targetUserId);
        if (!targetUser) {
            throw new AppError("User not found", 404);
        }

        if (targetUser.role === Role.Admin) {

            const adminCount = await userRepository.countByRole(Role.Admin);

            if (adminCount === 1) {
                throw new AppError(
                    "Cannot delete the last admin",
                    403
                );
            }
        }
        const deleteUser = await userRepository.deleteUser(targetUserId);
        return deleteUser;
    },
    async getUser(role: Role) {

        if (role === Role.Admin) {
            const getAllUser = await userRepository.findAllUser()
            if (getAllUser.length === 0) {
                throw new AppError("No user found", 404);
            }
            return getAllUser
        }

        if (role === Role.Manager) {
            const getAllEmployees = await userRepository.findAllEmployee()
            if (getAllEmployees.length === 0) {
                throw new AppError("No employees found", 404);
            }
            return getAllEmployees
        }
    },



    async updateUser(authenticatedUser: AuthenticatedUser, targetUserId: string, updateData: Partial<UserType>) {

        const targetUser = await userRepository.findById(targetUserId);

        if (!targetUser) {
            throw new AppError("User not found", 404);
        }

        // ADMIN
        if (authenticatedUser.role === Role.Admin) {

            const allowedFields = ["name", "email", "role", "isActive"];

            const updateKeys = Object.keys(updateData);
            const invalidField = updateKeys.find((key) => !allowedFields.includes(key));

            if (invalidField) {
                throw new AppError(`${invalidField} cannot be updated`, 400);
            }


            if (updateData.email !== undefined) {

                if (!isValidEmail(updateData.email)) {
                    throw new AppError("Invalid Email Format", 400);
                }

                const existingUser = await userRepository.findByEmail(updateData.email);

                if (
                    existingUser &&
                    existingUser._id.toString() !== targetUserId
                ) {
                    throw new AppError("Email already exists", 409);
                }
            }

            const updatedUser = await userRepository.updateUser(targetUserId, updateData);
            return updatedUser;
        }

        // MANAGER
        if (authenticatedUser.role === Role.Manager) {

            if (targetUser.role !== Role.Employee) {
                throw new AppError("Manager can only update employees", 403);
            }

            const allowedFields = ["name", "email"];
            const updateKeys = Object.keys(updateData);

            const invalidField = updateKeys.find((key) => !allowedFields.includes(key));

            if (invalidField) {
                throw new AppError(`Manager cannot update ${invalidField}`, 403);
            }

            const updatedUser = await userRepository.updateUser(targetUserId, updateData);
            return updatedUser;
        }

        // EMPLOYEE
        if (authenticatedUser.role === Role.Employee) {

            if (authenticatedUser._id !== targetUserId) {
                throw new AppError("You can only update your own profile", 403);
            }

            const allowedFields = ["name", "email"];
            const updateKeys = Object.keys(updateData);

            const invalidField = updateKeys.find((key) => !allowedFields.includes(key));

            if (invalidField) {
                throw new AppError(`Employee cannot update ${invalidField}`, 403);
            }

            const updatedUser = await userRepository.updateUser(targetUserId, updateData);
            return updatedUser;
        }

        throw new AppError("Invalid user role", 403);
    }

}   