import { z } from "zod";

export const CommentSchema = z.object({
    id: z.number(),
    content: z.string().min(1),
    fk_product_id: z.number(),
    fk_user_id: z.number(),
    _public: z.boolean()
});

export type CommentDTO = z.infer<typeof CommentSchema>;
