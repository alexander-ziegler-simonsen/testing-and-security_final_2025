import rateLimit from "express-rate-limit";

export const uploadRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20,                 // 20 uploads per IP
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: "Too many uploads, try again later"
    }
});
