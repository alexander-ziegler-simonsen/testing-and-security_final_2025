import jwt from "jsonwebtoken";

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not set");
}

const JWT_SECRET = process.env.JWT_SECRET!;

export type JwtPayload = {
    userId: number;
};

export const signToken = (payload: JwtPayload) =>
    jwt.sign(payload, JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    });

export const verifyToken = (token: string) =>
    jwt.verify(token, JWT_SECRET) as JwtPayload;
