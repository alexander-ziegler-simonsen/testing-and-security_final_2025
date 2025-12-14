import express from 'express';
import { ProductCreateSchema, ProductUpdateSchema } from '../schemas/ProductSchema';

import { createProductHandler, updateProductHandler, getProductByIdHandler, getProductsHandler, deleteProductHandler } from '../Controllers/ProductController';
import { validate } from '../middleware/validate';

const productRoutes = express.Router();

productRoutes.post("/", validate(ProductCreateSchema), createProductHandler);    // create one
productRoutes.get("/:id", getProductByIdHandler);                             // read one
productRoutes.get("/", getProductsHandler);                                   // read all
productRoutes.put("/:id", validate(ProductUpdateSchema), updateProductHandler);  // update one
productRoutes.delete("/:id", deleteProductHandler);                            // delete one

export default productRoutes;