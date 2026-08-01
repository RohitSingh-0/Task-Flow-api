import type { Request, Response, NextFunction } from "express"
import { AppError } from "../errors/AppError.js";
import jwt, {JsonWebTokenError, TokenExpiredError} from "jsonwebtoken"
import type { AuthTokenPayload } from "../types/auth.types.js";
import { userService } from "../services/user.service.js";

const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new AppError("Unauthorized", 401);
        }

        const parts = authHeader.split(" ");

        if (
            parts.length !== 2 ||
            parts[0] !== "Bearer" ||
            !parts[1]
        ) {
            throw new AppError("Unauthorized", 401);
        }

        const token = parts[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as AuthTokenPayload;

        const userId = decoded.userId;

        const user = await userService.getUserById(userId);

        req.user = user;

        next();
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return next(new AppError("Token has expired", 401));
        }

        if (error instanceof JsonWebTokenError) {
            return next(new AppError("Invalid token", 401));
        }

        return next(error);
    }
};

export default authMiddleware;

