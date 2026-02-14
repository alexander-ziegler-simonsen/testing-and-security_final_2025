import apiClient from "./apiClient";
import { ProductFavouriteSchema,ProductFavouriteDTO } from "../schemas/ProductFavouriteSchema";

export const productFavoriteService = {
    async getAll(): Promise<ProductFavouriteDTO[]> {
        const response = await apiClient.get(`/ProductFavorite/`)
        return response.data
    },

    async getById(id: string): Promise<ProductFavouriteDTO> {
        const response = await apiClient.get(`/ProductFavorite/${id}`)
        return response.data
    },

    async getByUserId(id: string): Promise<ProductFavouriteDTO> {
        const response = await apiClient.get(`/ProductFavorite/user/${id}`)
        return response.data
    }
}