import apiClient from "./apiClient";
import { ProductCardSchema, ProductDTO } from "../schemas/ProductSchema";

export const productService = {
    async getAll(): Promise<ProductDTO[]> {
        const response = await apiClient.get(`/Product/`)
        return response.data
    },

    async getById(id: string): Promise<ProductDTO> {
        const response = await apiClient.get(`/Product/${id}`)
        return response.data
    },

    async getByUserId(id: string): Promise<ProductDTO> {
        const response = await apiClient.get(`/Product/user/${id}`)
        return response.data
    }
}