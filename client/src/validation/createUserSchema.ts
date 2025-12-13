import { z } from "zod";

// Strong password regex:
// - at least 8 characters
// - min 2 lowercase
// - min 2 uppercase
// - min 1 symbol
const strongPassword = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .refine((val) => (val.match(/[a-z]/g) || []).length >= 2, {
        message: "Password must contain at least 2 lowercase letters",
    })
    .refine((val) => (val.match(/[A-Z]/g) || []).length >= 2, {
        message: "Password must contain at least 2 uppercase letters",
    })
    .refine((val) => /[^a-zA-Z0-9]/.test(val), {
        message: "Password must contain at least 1 symbol",
    });

export const createUserSchema = z
    .object({
        firstname: z.string().min(1, "Firstname is required"),
        lastname: z.string().min(1, "Lastname is required"),
        username: z
            .string()
            .min(1, "Username is required")
            .refine((val) => !val.includes(" "), {
                message: "Username cannot contain spaces",
            }),
        cityName: z.string().min(1, "City name is required"),
        cityCode: z
            .string()
            .regex(/^[0-9]+$/, "City code must contain only numbers"),
        address: z.string().min(1, "Address is required"),
        password: strongPassword,
        repeatPassword: z.string().min(1, "Please repeat the password"),
    })
    .refine((data) => data.password === data.repeatPassword, {
        message: "Passwords do not match",
        path: ["repeatPassword"],
    });

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type Issue = z.ZodError["issues"][number];
