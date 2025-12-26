import { Response, NextFunction } from "express";
import { AuthRequest } from "./JwtGuard";

// check if the roles is right
export const requireRole = (role: "user" | "admin") => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        if (req.user.role !== role) {
            return res.status(403).json({ message: "Forbidden" });
        }

        next();
    };
};
