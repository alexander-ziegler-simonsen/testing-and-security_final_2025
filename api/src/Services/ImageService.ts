//import { MainPrisma } from "../lib/MainPrisma";
import { ImageCreateDTO, ImageCreateSchema } from "../schemas/ImageSchema";
import { db } from "../lib/MainDrizzle";
import { productImages } from "../db/schema";
import sharp from "sharp";
import crypto from "crypto";
import path from "path";
import fs from "fs/promises";
import { createSelectSchema } from "drizzle-zod";

const selectSchema = createSelectSchema(productImages);
// const selectIdSchema = createSelectSchema(productImages).pick({id: true});
// const selectUserIdSchema = createSelectSchema(productImages).pick({fkProductId: true});

// TODO - replace this with an online image storage
// the local place where we store files
const UPLOAD_DIR = path.join(process.cwd(), "src/uploads/imgs");

export const createImage = async (
    input: { fk_product_id: number; buffer: Buffer }
) => {
    // make sure the folder exist
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    // process image safely
    const filename = crypto.randomUUID() + ".webp";
    const fullPath = path.join(UPLOAD_DIR, filename);

    await sharp(input.buffer)
        .resize(1024, 1024, { fit: "inside" })
        .toFormat("webp", { quality: 80 })
        .toFile(fullPath);

    const imagePath = `/uploads/imgs/${filename}`;

    // DB write
    const newProductImage = selectSchema.parse({
        fk_product_id: input.fk_product_id,
        imagepath: imagePath
    });

    const newImage = await db.insert(productImages).values(newProductImage);

    return ImageCreateSchema.parse(newImage);
};

export const getImage = async (input: { relativePath: string; }) => {
    const fullPath = path.resolve("/uploads/imgs/", input.relativePath);

    if (!fs.realpath(fullPath)) {
        return null;
    }

    //return fs.
};