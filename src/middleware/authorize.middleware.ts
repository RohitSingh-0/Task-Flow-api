import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";
import { Role } from "../constants/role.js";

export const authorize = (...allowedRoles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const role = req.user.role;

        if (!allowedRoles.includes(role)) {
            throw new AppError("Forbidden", 403);
        }

        next();
    };
};
