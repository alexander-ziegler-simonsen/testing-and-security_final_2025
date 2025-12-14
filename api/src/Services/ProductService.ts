import { Prisma } from "../generated/prisma/client";
import { MainPrisma } from "../lib/MainPrisma";
import { ProductCreateSchema, ProductResponseSchema, ProductCreateDTO, ProductUpdateDTO } from "../schemas/ProductSchema";

export const createProduct = async (input: ProductCreateDTO) => {
    const newProduct = await MainPrisma.products.create({data: input});
    return ProductCreateSchema.parse(newProduct);
};

export const getProducts = async () => {
    const Products = await MainPrisma.products.findMany();
    return Products.map((pro) =>  ProductResponseSchema.parse(pro));
};

export const getProductById = async (id: number) => {
    const Product = await MainPrisma.products.findUnique({ where: { id } });
    return Product ? ProductResponseSchema.parse(Product) : null;
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
        await tx.comments.deleteMany({where: {fk_product_id: id} });
        await tx.productImages.deleteMany({where: {fk_product_id: id} });
        await tx.productFavorite.deleteMany({where: {fk_product_id: id} });

        // then delete the post
        await tx.products.delete({where: {id} });
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