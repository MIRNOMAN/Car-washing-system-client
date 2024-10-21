
export interface TUser {
    exp: number;
    iat: number;
    role: "user" | "admin"
    user: string;
}