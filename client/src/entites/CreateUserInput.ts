import { z } from "zod";

export const FullUserSchema = z.object({
    id: z.string().uuid().optional(),  // optional if server creates it

    firstname: z.string(),
    lastname: z.string(),
    username: z.string(),
    cityName: z.string(),
    cityCode: z.string(),     // numeric string allowed

    address: z.string(),

    // NEVER store repeatPassword in entity
    // You also should not return the real password.
    // Instead: store hashed password on backend
    passwordHash: z.string().optional(),
});

// Typescript type:
export type FullUser = z.infer<typeof FullUserSchema>;
