import { z } from "zod";

export const UserSchema = z.object({
    id: z.number(),
    username: z.string().min(4)
});

export type UserDTO = z.infer<typeof UserSchema>;