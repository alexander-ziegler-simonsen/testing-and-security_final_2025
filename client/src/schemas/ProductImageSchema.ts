import { z } from "zod";

export const ProductImageSchema = z.object({
    id: z.number(),
    title: z.string().min(1),
    description: z.string().min(1),
    images: z.array(z.string()).default([]),
    price: z.string().transform((val) => Number(val)),
});

export type ProductImageDTO = z.infer<typeof ProductImageSchema>;