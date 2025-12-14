import { z } from "zod";

// POST
export const CommentCreateSchema = z.object({
    content: z.string().min(1),
    fk_user_id: z.number(),
    public: z.boolean(),
    fk_product_id: z.int()
});

export type CommentCreateDTO = z.infer<typeof CommentCreateSchema>;


// READ
export const CommentResponseSchema = z.object({
    id: z.int(),
    content: z.string().min(1),
    fk_user_id: z.number(),
    public: z.boolean(),
    fk_product_id: z.int()
});

export type CommentResponse = z.infer<typeof CommentResponseSchema>;


// UPDATE
export const CommentUpdateSchema = z.object({
    id: z.int(),
    content: z.string().min(1).optional(),
    fk_user_id: z.number().optional(),
    public: z.boolean().optional(),
    fk_product_id: z.int().optional()
});

export type CommentUpdateDTO = z.infer<typeof CommentUpdateSchema>;