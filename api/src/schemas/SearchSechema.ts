import { numeric } from "drizzle-orm/pg-core";
import { z } from "zod";

export const PriceSchema = numeric("price", { precision: 10, scale: 2 });

export const SearchBasicSchema = z.object({
    search: z.string()
});

export type SearchBasicDTO = z.infer<typeof SearchBasicSchema>;

export const SearchAdvanceSchema = z.object({
    search: z.string().optional(),
    searchInTitle: z.boolean().optional(),
    searchInDescription: z.boolean().optional(),

    minPrice: z.number().optional(),
    maxPrice: z.number().optional(),

    sortBy: z.enum(["date", "price"]).optional(),
    sortOrder: z.enum(["asc", "desc"]).optional()
});


export type SearchAdvanceDTO = z.infer<typeof SearchAdvanceSchema>;