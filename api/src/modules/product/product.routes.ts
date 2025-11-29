// src/modules/product/product.routes.ts
import { Router } from "express";
import { ProductController } from "./product.controller.js";

export const productRouter = Router();

productRouter.get("/", ProductController.getAll);
productRouter.get("/:id", ProductController.getOne);
productRouter.post("/", ProductController.create);
productRouter.put("/:id", ProductController.update);
productRouter.delete("/:id", ProductController.delete);
