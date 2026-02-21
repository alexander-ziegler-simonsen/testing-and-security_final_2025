import { Request, Response } from "express";
import { loginSchema } from "../schemas/LoginSchema";
import { loginService } from "../Services/AuthService";
import { AuthRequest } from "../middleware/JwtGuard"; 

export const login = async (req: Request, res: Response) => {
    try {
        console.log("RAW BODY:", req.body); 

        const { email, password } = loginSchema.parse(req.body);

        console.log("PARSED:", email, password);

        const result = await loginService(email, password);

        res.json(result);
    } catch (err) {
        console.error("LOGIN ERROR:", err);

        if (err instanceof Error && err.message === "INVALID_CREDENTIALS") {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.status(400).json({ message: "Bad request" });
    }
};

export const me = async (req: AuthRequest, res: Response) => {
    res.json({
        user: {
            userId: req.user?.userId,
            role: req.user?.role
        }});
}
