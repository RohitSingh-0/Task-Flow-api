import type { AuthenticatedUser } from "./user.types.ts";

declare global {
    namespace Express {
        interface Request {
            user: AuthenticatedUser;
        }
    }
}
export {};