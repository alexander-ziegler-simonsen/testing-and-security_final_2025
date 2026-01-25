//import { Prisma } from "../generated/prisma/client";
//import { MainPrisma } from "../lib/MainPrisma";
import { ProductCreateSchema, ProductResponseSchema, ProductCreateDTO, ProductUpdateDTO } from "../schemas/ProductSchema";
import { db } from "../lib/MainDrizzle";
import { products} from "../db/schema";
import { eq } from "drizzle-orm";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';

const selectSchema = createSelectSchema(products);
const selectIdSchema = createSelectSchema(products).pick({id: true});
const addSchema = createInsertSchema(products);
const updateSchema = createUpdateSchema(products);

export const createProduct = async (input: ProductCreateDTO) => {
    const newProduct = await addSchema.parse(input);
    return await db.insert(products).values(newProduct);
};

export const getProducts = async () => {
    const Products = await db.select().from(products);
    return selectSchema.array().parse(Products);
};

export const getProductById = async (id: number) => {
    const Product = selectIdSchema.parse(id);
    const oneProduct = await db.select().from(products).where(eq(products.id, Product.id));
    return selectSchema.parse(oneProduct);
};

export const updateProduct = async (id: number, data: ProductUpdateDTO) => {
    const updatedProduct = updateSchema.parse(data);
    const newProdut = await db.update(products).set(updatedProduct).where(eq(products.id, id))
    return selectSchema.parse(newProdut);
};

export const deleteProduct = async (id: number) => {
    // const deletedProduct = await MainPrisma.products.delete({ where: { id } });
    // return ProductResponseSchema.parse(deletedProduct);

    const deletedProduct = selectIdSchema.parse(id);
    const result = await db.delete(products).where(eq(products.id, deletedProduct.id));
    return result;

    // try {
    //     MainPrisma.$transaction(async (tx) => {
    //     // delete everything that is connected to this post
    //     await tx.comments.deleteMany({where: {fk_product_id: id} });
    //     await tx.productImages.deleteMany({where: {fk_product_id: id} });
    //     await tx.productFavorite.deleteMany({where: {fk_product_id: id} });

    //     // then delete the post
    //     await tx.products.delete({where: {id} });
    //     });

    //     return true;
    // } catch (err) {
    //     if (
    //         err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025"
    //     ) {
    //         return false;
    //     }
    //     throw err;
    // }
}