import apiClient from "./apiClient";
import { ProductCategorySchema, ProductCategoryDTO } from "../schemas/ProductCategorySchema";

export const productCategoryService = {
    async getAll(): Promise<ProductCategoryDTO[]> {
        const response = await apiClient.get(`/productCategory/`)
        return response.data
    },

    async getById(id: string): Promise<ProductCategoryDTO> {
        const response = await apiClient.get(`/productCategory/${id}`)
        return response.data
    }
}