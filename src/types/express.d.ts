import type { UserType } from "./user.types.ts";

declare global {
    namespace Express {
        interface Request {
            user: UserType;
        }
    }
}
export {};