import { z } from "zod";
import { Decimal } from "@prisma/client/runtime/client";

// prisma uses decimal numbers get returned as a 'Decimal2' object, which zod does not support
// price convert
export const PriceSchema = z
    .custom<Decimal>((val) => val instanceof Decimal, {
        message: "Expected Prisma Decimal",
    })
    .transform((val) => {
        const num = val.toNumber();
        return Math.floor(num * 100) / 100;
    });


// POST
export const ProductCreateSchema = z.object({
    fk_user_id: z.number(),
    price: PriceSchema,
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
    price: PriceSchema,
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
    price: PriceSchema.optional(),
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