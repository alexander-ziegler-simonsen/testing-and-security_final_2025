import express from "express";
import { uploadImageController } from "../Controllers/ImageController";
import { upload } from "../middleware/Upload";
import { uploadRateLimiter } from "../middleware/rateLimit";
import { authMiddleware } from "../middleware/JwtGuard";

const imageRoutes = express.Router();

imageRoutes.post(
    "/",
    uploadRateLimiter,
    authMiddleware,
    upload.single("image"),
    uploadImageController
);

export default imageRoutes;
