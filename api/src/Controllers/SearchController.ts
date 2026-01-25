import { Request, Response } from "express";
import { SearchAdvanceProducts, SearchProducts } from "../Services/SearchService";
import { SearchAdvanceSchema } from "../schemas/SearchSechema";

export const SearchHandler = async (req: Request, res: Response) => {

    const searchValue = req.query.search?.toString();

    console.log("seachController", searchValue);

    if (!searchValue) {
        return res.status(400).json({ message: "no search value" });
    }
    const products = await SearchProducts({ "search": searchValue });

    res.status(201).json(products);
};

export const SearchAdvanceHandler = async (req: Request, res: Response) => {
    try {
        // Parse & validate query params
        const parsedInput = SearchAdvanceSchema.parse({
            search: req.query.search,
            searchInTitle: req.query.searchInTitle === "true",
            searchInDescription: req.query.searchInDescription === "true",

            minPrice: req.query.minPrice
                ? Number(req.query.minPrice)
                : undefined,
            maxPrice: req.query.maxPrice
                ? Number(req.query.maxPrice)
                : undefined,

            sortBy: req.query.sortBy,
            sortOrder: req.query.sortOrder,
        });

        const products = await SearchAdvanceProducts(parsedInput);

        const output = products.map((pro) => ({
            id: pro.id,
            title: pro.title,
            description: pro.description ?? "",
            price: Number(pro.price),
            // images: p.ProductImages.map((img) => img.imagepath),
            images: pro.ProductImages.map((img) => img.imagepath)
        }));

        res.status(200).json(output);
    } catch (error) {
        res.status(400).json({
            message: "Invalid search parameters",
            error,
        });
    }
};