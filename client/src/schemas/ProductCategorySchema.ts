import { z } from "zod";

export const ProductCategorySchema = z.object({
    id: z.number(),
    title: z.string().min(1),
    description: z.string().min(1),
    images: z.array(z.string()).default([]),
    price: z.string().transform((val) => Number(val)),
});

export type ProductCategoryDTO = z.infer<typeof ProductCategorySchema>;