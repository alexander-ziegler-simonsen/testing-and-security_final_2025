import { z } from "zod";

export const CommentSchema = z.object({
    text: z.string().min(1),
    date: z.string().min(1),
    userId: z.number(),
    visabity: z.boolean()
});

export type CommentDTO = z.infer<typeof CommentSchema>;
