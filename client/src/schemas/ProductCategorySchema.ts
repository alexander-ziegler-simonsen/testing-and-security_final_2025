import { z } from "zod";

export const ProductCategorySchema = z.object({
    id: z.number(),
    name: z.string(),
    fk_pc_parant_id: z.number().nullable()
});

export type ProductCategoryDTO = z.infer<typeof ProductCategorySchema>;