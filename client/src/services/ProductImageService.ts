import apiClient from "./apiClient";
import { ProductImageSchema,ProductImageDTO } from "../schemas/ProductImageSchema";

export const productImageService = {
    async getAll(): Promise<ProductImageDTO[]> {
        const response = await apiClient.get(`/ProductImage/`)
        return response.data
    },

    async getById(id: string): Promise<ProductImageDTO> {
        const response = await apiClient.get(`/ProductImage/${id}`)
        return response.data
    },

    // async getByUserId(id: string): Promise<ProductImageDTO> {
    //     const response = await apiClient.get(`/ProductImage/user/${id}`)
    //     return response.data
    // }
}