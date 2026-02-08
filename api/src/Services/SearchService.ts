
//import { MainPrisma } from "../lib/MainPrisma";
import { db } from "../lib/MainDrizzle";
import { productImages, products } from "../db/schema";
import { and, or, ilike, eq, gte, lte, asc, desc, } from "drizzle-orm";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';

const selectSchema = createSelectSchema(products);
const selectIdSchema = createSelectSchema(products).pick({ id: true });
const selectUserIdSchema = createSelectSchema(products).pick({ fkUserId: true });

import { SearchAdvanceDTO, SearchBasicDTO, SearchBasicSchema } from "../schemas/SearchSechema";

export const SearchProducts = async (input: SearchBasicDTO) => {

    console.log("SearchProducts was called");
    const rows = await db.select().from(products).where(
        or(
            ilike(products.title, input.search),
            ilike(products.description, input.search)
        )
    );

    //console.log("rows", rows);
    return rows;
};

export const SearchAdvanceProducts = async (input: SearchAdvanceDTO) => {

    console.log("SearchAdvanceProducts was called");

    const whereClauses = [];

    if (input.search) {
        const search = `%${input.search}%`;
        const searchClauses = [];

        if (input.searchInTitle !== false) {
            searchClauses.push(ilike(products.title, search));
        }

        if (input.searchInDescription !== false) {
            searchClauses.push(ilike(products.description, search));
        }

        if (searchClauses.length > 0) {
            whereClauses.push(or(...searchClauses));
        }
    }

    whereClauses.push(eq(products.state, "Open"));

    if (input.minPrice !== undefined) {
        whereClauses.push(gte(products.price, input.minPrice.toString()));
    }

    if (input.maxPrice !== undefined) {
        whereClauses.push(lte(products.price, input.maxPrice.toString()));
    }

    let rows;


    if (input.sortBy == "date") {
        rows = await db
            .select({
                product: products,
                imagePath: productImages.imagepath,
            })
            .from(products)
            .leftJoin(productImages, eq(productImages.fkProductId, products.id))
            .where(and(...whereClauses))
            
        input.sortOrder == "asc" 
        ? rows.sort((a, b) => { return Number(a.product.id) - Number(b.product.id); }) 
        : rows.sort((a, b) => { return Number(b.product.id) - Number(a.product.id); });
    }

    else {
        rows = await db
            .select({
                product: products,
                imagePath: productImages.imagepath,
            })
            .from(products)
            .leftJoin(productImages, eq(productImages.fkProductId, products.id))
            .where(and(...whereClauses));

        input.sortOrder == "asc" 
        ? rows.sort((a, b) => { return Number(a.product.price) - Number(b.product.price); }) 
        : rows.sort((a, b) => { return Number(b.product.price) - Number(a.product.price); });
    }




    return rows;
};
