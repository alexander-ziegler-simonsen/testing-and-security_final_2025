import multer from "multer";

export const upload = multer({
    storage: multer.memoryStorage(), // IMPORTANT
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
        files: 1
    },
    fileFilter(
        req: Express.Request,
        file: Express.Multer.File,
        cb: multer.FileFilterCallback
    ) {
        const allowed = ["image/jpeg", "image/png", "image/webp"];

        if (!allowed.includes(file.mimetype)) {
            cb(new Error("Only images are allowed"));
        } else {
            cb(null, true);
        }
    }
});
