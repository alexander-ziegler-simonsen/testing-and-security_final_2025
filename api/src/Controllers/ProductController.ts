import { Request, Response } from "express";
import { createProduct, getProductById, deleteProduct, updateProduct } from "../Services/ProductService";
import { ProductCreateDTO, ProductUpdateDTO, ProductDeleteParamsSchema } from "../schemas/ProductSchema";
import { getMyProducts } from "../Services/ProductService";
import { AuthRequest } from "../middleware/JwtGuard";

// create one product
export const createProductHandler = async (req: Request<{}, {}, ProductCreateDTO>,res: Response) => {
    const product = await createProduct(req.body);
    return res.status(201).json(product);
};

// read all products


export const getMyProductsHandler = async (req: AuthRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const products = await getMyProducts(req.user.userId);
    return res.json(products);
};

// read one product
export const getProductByIdHandler = async (req: Request, res: Response) => {
    const product = await getProductById(Number(req.params.id));
    if (!product) {
        return res.status(404).json({ message: "product not found" });
    }
    return res.json(product);
};

// update one product
export const updateProductHandler = async ( 
//                   {parms}, {resBody}, {reqBody}, ({reqQuery})
    req: Request<{ id: string }, {}, ProductUpdateDTO>,
    res: Response
) => {
    try {
        const updated = await updateProduct(Number(req.params.id), req.body);
        return res.json(updated);
    } catch (err) {
        return res.status(404).json({ message: "product not found" });
    }
};

// delete one product
export const deleteProductHandler = async ( req: Request, res: Response ) => {
    
    const { id } = ProductDeleteParamsSchema.parse(req.params);
    
    const deleted = await deleteProduct(Number(req.params.id));

    if(!deleted) {
        return res.status(404).json({ message: "product not found" });
    }
    
    return res.json(204).send();
};