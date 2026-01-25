import { Router } from "express";
import { authMiddleware } from "../middleware/JwtGuard";
import { login, me } from "../Controllers/AuthController";
import { requireRole } from "../middleware/requireRole";

const AuthRoutes = Router();

AuthRoutes.get("/me", authMiddleware, me);

AuthRoutes.post("/login", login);

AuthRoutes.get("/admin/test", authMiddleware, requireRole("admin"), (req, res) => res.json({ok: true}));

export default AuthRoutes;
