import { z } from "zod";

// POST
export const UserCreateSchema = z.object({
    username: z.string().min(1),
    password: z.string(),
    salt: z.string(),
    firstname: z.string(),
    lastname: z.string(),
    email: z.email(),
    phone: z.string(),
    signedup: z.coerce.date()
});

export type UserCreateDTO = z.infer<typeof UserCreateSchema>;


// READ
export const UserResponseSchema = z.object({
    id: z.number(),
    username: z.string().min(1),
    password: z.string(),
    salt: z.string(),
    firstname: z.string(),
    lastname: z.string(),
    email: z.string(),
    phone: z.string(),
    signedup: z.coerce.date()
});

export type UserResponse = z.infer<typeof UserResponseSchema>;


// UPDATE
export const UserUpdateSchema = z.object({
    id: z.number().optional(),
    username: z.string().min(1).optional(),
    password: z.string().optional(),
    salt: z.string().optional(),
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    signedup: z.coerce.date().optional()
});

export type UserUpdateDTO = z.infer<typeof UserUpdateSchema>;


// LOGIN
export const UserLoginSchema = z.object({
    username: z.string().min(1),
    password: z.string(),
    email: z.string(),
});

export type UserLoginDTO = z.infer<typeof UserLoginSchema>;