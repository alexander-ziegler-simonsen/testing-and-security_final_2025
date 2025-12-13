// src/entities/user.ts
import { z } from "zod";

// ---- UserLogin ----
export const UserLoginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Invalid password"),
});

// Typescript type automatically created:
export type UserLogin = z.infer<typeof UserLoginSchema>;
