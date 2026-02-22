import apiClient from "./apiClient";
import { ProductCardDTO, ProductCardSchema, ProductDTO } from "../schemas/ProductSchema";

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
    },

    async fetchRandomProducts(): Promise<Array<ProductCardDTO>> {

        const res = await apiClient.get("/Product/random");

        if (!res) {
            throw new Error("Failed to load products");
        }

        const json: Array<ProductCardDTO> = await res.data;
        return json;

    }
}