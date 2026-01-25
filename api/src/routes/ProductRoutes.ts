import express from 'express';
import { ProductCreateSchema, ProductUpdateSchema } from '../schemas/ProductSchema';

import { createProductHandler, updateProductHandler, getProductByIdHandler, deleteProductHandler, getMyProductsHandler } from '../Controllers/ProductController';
import { validate } from '../middleware/validate';
import { authMiddleware } from "../middleware/JwtGuard";

const productRoutes = express.Router();

productRoutes.post("/", validate(ProductCreateSchema), createProductHandler);    // create one
productRoutes.get("/my", authMiddleware, getMyProductsHandler);                      // read all connect to this user
productRoutes.get("/:id", getProductByIdHandler);                             // read one
productRoutes.put("/:id", validate(ProductUpdateSchema), updateProductHandler);  // update one
productRoutes.delete("/:id", deleteProductHandler);                            // delete one


export default productRoutes;