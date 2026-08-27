import type { Request, Response, NextFunction } from "express"
import { AppError } from "../errors/AppError.js";

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
    if (err instanceof AppError) {
        res.status(err.statusCode).send(err.message);
    } else {
        res.status(500).send("Internal Server Error");
    }
}