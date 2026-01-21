import { Router } from "express";
import { authMiddleware } from "../middleware/JwtGuard";
import { login, me } from "../Controllers/AuthController";

const AuthRoutes = Router();

AuthRoutes.get("/me", authMiddleware, me);

AuthRoutes.post("/login", login);

export default AuthRoutes;
