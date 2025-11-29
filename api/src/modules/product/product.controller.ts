// src/modules/product/product.controller.ts
import {  } from "express";
import { ProductService } from "./product.service.js";
import { createProductSchema, updateProductSchema } from "./product.schema.js";

export const ProductController = {

    getAll: async (_req: Request, res: Response) => {
        const products = await ProductService.getAll();
        res.json(products);
    },

    getOne: async (req: Request, res: Response) => {
        const product = await ProductService.getOne(Number(req.params.id));
        if (!product) return res.status(404).json({ message: "Not found" });
        res.json(product);
    },

    create: async (req: Request, res: Response) => {
        const parsed = createProductSchema.safeParse(req.body);
        if (!parsed.success) return res.status(400).json(parsed.error);

        const product = await ProductService.create(parsed.data);
        res.status(201).json(product);
    },

    update: async (req: Request, res: Response) => {
        const parsed = updateProductSchema.safeParse(req.body);
        if (!parsed.success) return res.status(400).json(parsed.error);

        const product = await ProductService.update(
            Number(req.params.id),
            parsed.data
        );
        res.json(product);
    },

    delete: async (req: Request, res: Response) => {
        await ProductService.delete(Number(req.params.id));
        res.status(204).send();
    },
};
