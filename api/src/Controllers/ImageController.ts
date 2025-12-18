import { Request, Response } from "express";
import { createImage } from "../Services/ImageService";

export const uploadImageController = async (req: Request, res: Response) => {
    // no file
    if (!req.file) {
        return res.status(400).json({ message: "No image uploaded" });
    }

    // productId
    const productId = Number(req.body.fk_product_id);

    if (!productId || Number.isNaN(productId)) {
        return res.status(400).json({ message: "Invalid product id" });
    }

    // call the function "createImage" on the ImageService
    const image = await createImage({fk_product_id: productId, buffer: req.file.buffer});

    res.status(201).json(image);
};