// src/modules/product/product.service.ts
import { prisma } from "../../db/prisma.js";

export const ProductService = {
    getAll: () => prisma.product.findMany(),

    getOne: (id: number) =>
        prisma.product.findUnique({ where: { id } }),

    create: (data: { name: string; price: number }) =>
        prisma.product.create({ data }),

    update: (id: number, data: any) =>
        prisma.product.update({ where: { id }, data }),

    delete: (id: number) =>
        prisma.product.delete({ where: { id } }),
};
