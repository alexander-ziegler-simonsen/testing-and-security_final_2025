import { z } from "zod";

export const ProductSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    images: z.array(z.url()),
    price: z.number().positive(),
});

export type ProductDTO = z.infer<typeof ProductSchema>;

export const ProductCardSchema = z.object({
    title: z.string().min(1),
    images: z.url(),
    price: z.number().positive(),
});

export type ProductCardDTO = z.infer<typeof ProductSchema>;
