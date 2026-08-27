import type { Role } from "../constants/role.js";

export interface AuthenticatedUser {
    _id: string;
    name: string;
    email: string;
    role: Role;
    isActive: boolean;
}

export type UserType = {
    name: string,
    email: string,
    password: string,
    role: Role,
    isActive: boolean,
    createdBy?: string | null,
}
export type UserEmail = {
    email: string
}
export interface Login {
    email: string,
    password: string
}

export interface AuthTokenPayload {
    userId: string;
}