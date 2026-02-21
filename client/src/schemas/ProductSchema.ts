import { z } from "zod";

export const ProductSchema = z.object({
    id: z.number(),
    title: z.string().min(1),
    description: z.string().min(1),
    images: z.array(z.string()).default([]),
    price: z.string().transform((val) => Number(val)),
});

export type ProductDTO = z.infer<typeof ProductSchema>;

export const ProductSearchSchema = z.object({
    id: z.number(),
    title: z.string().min(1),
    description: z.string().min(1),
    images: z.string(),
    price: z.string().transform((val) => Number(val)),
});

export type ProductSearchDTO = z.infer<typeof ProductSearchSchema>;

export const ProductCardSchema = z.object({
    title: z.string().min(1),
    images: z.url(),
    price: z.string().transform((val) => Number(val)),
});

export type ProductCardDTO = z.infer<typeof ProductSchema>;
