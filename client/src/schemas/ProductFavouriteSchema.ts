import { z } from "zod";

export const ProductFavouriteSchema = z.object({
    id: z.number(),
    fk_user_id: z.number(),
    fk_product_id: z.number()
});

export type ProductFavouriteDTO = z.infer<typeof ProductFavouriteSchema>;