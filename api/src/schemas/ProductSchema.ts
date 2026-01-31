import { z } from "zod";
import { numeric } from "drizzle-orm/pg-core";

// prisma uses decimal numbers get returned as a 'Decimal2' object, which zod does not support
// price convert
//export const PriceSchema = numeric("price", { precision: 10, scale: 2 });
export const PriceInputSchema = z.union([z.string(), z.number()])
    .transform(val => Number(val))
    .nonoptional()
    .refine(val => !Number.isNaN(val), { message: "Invalid price", });

// POST
export const ProductCreateSchema = z.object({
    fk_user_id: z.number(),
    price: PriceInputSchema,
    title: z.string(),
    description: z.string(),
    state: z.enum(["Open", "Sold", "Deactivated"]),
    fk_productcategories_id: z.int(),
});

export type ProductCreateDTO = z.infer<typeof ProductCreateSchema>;


// READ
export const ProductResponseSchema = z.object({
    id: z.number(),
    fk_user_id: z.number(),
    price: z.number(),
    title: z.string(),
    description: z.string(),
    state: z.enum(["Open", "Sold", "Deactivated"]),
    fk_productcategories_id: z.int(),
    images: z.array(z.string()),
});

export type ProductResponseDTO = z.infer<typeof ProductResponseSchema>;


// UPDATE
export const ProductUpdateSchema = z.object({
    id: z.number().optional(),
    fk_user_id: z.number().min(1).optional(),
    price: z.number(),
    title: z.string(),
    description: z.string().optional(),
    state: z.enum(["Open", "Sold", "Deactivated"]),
    fk_productcategories_id: z.string().optional(),
});

export type ProductUpdateDTO = z.infer<typeof ProductUpdateSchema>;

// delete
export const ProductDeleteParamsSchema = z.object({
    id: z.coerce.number().int().positive()
})