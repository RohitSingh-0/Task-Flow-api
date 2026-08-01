export type UserType = {
    name: string,
    email: string,
    password: string,
    role: string,
    isActive: boolean,
    createdBy: string
}
export type UserEmail = {
    email: string
}
export interface Login {
    email: string,
    password: string
}