import { z } from "zod";

export const ProductImageSchema = z.object({
    id: z.number(),
    fk_product_id: z.number(),
    imagepath: z.string(),
});

export type ProductImageDTO = z.infer<typeof ProductImageSchema>;