import { z } from "zod";

export const ImageSchema = z.object({
    id: z.number(),
    fk_product_id: z.number(),
    imagepath: z.string()
});
export type ImageDTO = z.infer<typeof ImageSchema>;

export const ImageCreateSchema = z.object({
    fk_product_id: z.number(),
    imagepath: z.string()
})

export type ImageCreateDTO = z.infer<typeof ImageCreateSchema>;