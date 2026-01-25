
import { MainPrisma } from "../lib/MainPrisma";
import { SearchAdvanceDTO, SearchBasicDTO, SearchBasicSchema } from "../schemas/SearchSechema";
import { Prisma } from "../generated/prisma/client";

export const SearchProducts = async (input: SearchBasicDTO) => {

    console.log("SearchProducts was called");
    const products = await MainPrisma.products.findMany({
        where: {
            OR: [
                {
                    title: {
                        contains: input.search,
                        mode: "insensitive",
                    },
                },
                {
                    description: {
                        contains: input.search,
                        mode: "insensitive",
                    },
                },
            ],
        },
    });

    return products;
};

export const SearchAdvanceProducts = async (input: SearchAdvanceDTO) => {

    console.log("SearchAdvanceProducts was called");

    // search title or/and descript
    const orConditions: Prisma.ProductsWhereInput[] = [];

    if (input.search) {
        if (input.searchInTitle !== false) {
            orConditions.push({
                title: {
                    contains: input.search,
                    mode: "insensitive",
                },
            });
        }

        if (input.searchInDescription !== false) {
            orConditions.push({
                description: {
                    contains: input.search,
                    mode: "insensitive",
                },
            });
        }
    }

    // price filter
    const priceFilter =
        input.minPrice || input.maxPrice ? { price: { gte: input.minPrice, lte: input.maxPrice }, }
            : undefined;

    // what order to use
    let orderBy: any = undefined;

    if (input.sortBy === "price") {
        orderBy = {
            price: input.sortOrder ?? "asc",
        };
    }

    if (input.sortBy === "date") {
        orderBy = {
            id: input.sortOrder ?? "desc", // assumes higher id = newer
        };
    }



    const products = await MainPrisma.products.findMany({
        where: {
            AND: [
                { state: "Open" },
                orConditions.length > 0 ? { OR: orConditions } : {},
                priceFilter ?? {},
            ],
        },
        include: {
            ProductImages: {
                select: {
                    imagepath: true,
                }
            }
        },
        orderBy,
    });

    console.log("SearchAdvanceProducts - products", products);

    return products;
};
