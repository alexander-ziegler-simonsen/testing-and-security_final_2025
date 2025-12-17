import { z } from "zod";

// POST - client input
export const UserRegisterRequestPublicSchema = z.object({
    username: z.string().min(4).max(20),
    firstname: z.string().min(4).max(35),
    lastname: z.string().min(4).max(35),
    email: z.email().min(6).max(35),
    password: z.string(),
    phone: z.string().min(8).max(8)
});

export type UserRegisterRequestPublicDTO = z.infer<typeof UserRegisterRequestPublicSchema>;

// POST - used by api
export const UserRegisterInternalSchema = z.object({
    username: z.string(),
    hashedpassword: z.string(),
    salt: z.string(),
    firstname: z.string(),
    lastname: z.string(),
    email: z.email(),
    phone: z.string(),
    signedup: z.coerce.date(),
});

export type UserRegisterInternalDTO = z.infer<typeof UserRegisterInternalSchema>;


// READ - public
export const UserResponsePublicSchema = z.object({
    id: z.number(),
    username: z.string().min(4).max(20),
    firstname: z.string().min(4).max(35),
    lastname: z.string().min(4).max(35),
});

export type UserResponsePublic = z.infer<typeof UserResponsePublicSchema>;

// read - admin
export const UserResponseAdminSchema = z.object({
    id: z.number(),
    username: z.string().min(4).max(20),
    firstname: z.string().min(4).max(35),
    lastname: z.string().min(4).max(35),
    email: z.email().min(5).max(35),
    phone: z.string().min(8).max(8),
    signedup: z.coerce.date()
});

export type UserResponseAdmin = z.infer<typeof UserResponseAdminSchema>;

// UPDATE - public
export const UserUpdatePublicSchema = z.object({
    username: z.string().min(4).max(20).optional(),
    firstname: z.string().min(4).max(35).optional(),
    lastname: z.string().min(4).max(35).optional(),
    email: z.email().min(5).max(35).optional(),
    phone: z.string().min(8).max(8).optional()
});

export type UserUpdatePublicDTO = z.infer<typeof UserUpdatePublicSchema>;

// update - admin 

export const UserUpdateAdminSchema = z.object({
    id: z.number(),
    username: z.string().min(4).max(20).optional(),
    firstname: z.string().min(4).max(35).optional(),
    lastname: z.string().min(4).max(35).optional(),
    email: z.email().min(5).max(35).optional(),
    phone: z.string().min(8).max(8).optional(),
    signedup: z.coerce.date().optional()
});

export type UserUpdateAdminDTO = z.infer<typeof UserUpdateAdminSchema>;

// LOGIN
export const UserLoginSchema = z.object({
    username: z.string().min(1),
    password: z.string(),
    email: z.string(),
});

export type UserLoginDTO = z.infer<typeof UserLoginSchema>;