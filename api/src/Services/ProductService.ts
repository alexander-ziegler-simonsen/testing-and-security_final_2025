import { Prisma } from "../generated/prisma/client";
import { MainPrisma } from "../lib/MainPrisma";
import { ProductCreateSchema, ProductResponseSchema, ProductCreateDTO, ProductUpdateDTO } from "../schemas/ProductSchema";
import { db } from "../lib/MainDrizzle";
import { products} from "../db/schema";
import { eq } from "drizzle-orm";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';

const selectSchema = createSelectSchema(products);
const selectIdSchema = createSelectSchema(products).pick({id: true});
const selectUserIdSchema = createSelectSchema(products).pick({fkUserId: true});

const addSchema = createInsertSchema(products);
const updateSchema = createUpdateSchema(products);

export const createProduct = async (input: ProductCreateDTO) => {
    const newProduct = await MainPrisma.products.create({ data: input });
    return ProductCreateSchema.parse(newProduct);
};

export const getMyProducts = async (userId: number) => {
    const products = await MainPrisma.products.findMany({
        where: {
            fk_user_id: userId,
        },
        include: {
            ProductImages: {
                select: {
                    imagepath: true,
                },
            },
        },
    });

    return products.map((pro) =>
        ProductResponseSchema.parse({
            ...pro,
            images: pro.ProductImages.map((img) => img.imagepath),
        })
    );
};

export const getProductById = async (id: number) => {
    //const Product = selectIdSchema.parse(id);
    const oneProduct = await db.select().from(products).where(eq(products.id, id)).limit(1);
    const output = selectSchema.parse(oneProduct[0]);
    console.log("output",output);
    return output;
};

export const getMyProducts = async (user_id: number) => {
    const Products = selectUserIdSchema.parse(user_id);
    const myProducts = await db.select().from(products).where(eq(products.fkUserId, Products.fkUserId));
    return selectSchema.array().parse(myProducts);
};

export const updateProduct = async (id: number, data: ProductUpdateDTO) => {
    const updatedProduct = await MainPrisma.products.update({ where: { id }, data });
    return ProductResponseSchema.parse(updatedProduct)
};

export const deleteProduct = async (id: number) => {
    // const deletedProduct = await MainPrisma.products.delete({ where: { id } });
    // return ProductResponseSchema.parse(deletedProduct);

    try {
        MainPrisma.$transaction(async (tx) => {
            // delete everything that is connected to this post
            await tx.comments.deleteMany({ where: { fk_product_id: id } });
            await tx.productImages.deleteMany({ where: { fk_product_id: id } });
            await tx.productFavorite.deleteMany({ where: { fk_product_id: id } });

            // then delete the post
            await tx.products.delete({ where: { id } });
        });

        return true;
    } catch (err) {
        if (
            err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025"
        ) {
            return false;
        }
        throw err;
    }
}