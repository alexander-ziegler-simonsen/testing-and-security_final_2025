import apiClient from "./apiClient";
import { CommentSchema, CommentDTO } from "../schemas/CommentSchema";

export const commentService = {
    async getAll(): Promise<CommentDTO[]> {
        const response = await apiClient.get(`/Comment`)
        return response.data
    },

    async getById(id: string): Promise<CommentDTO> {
        const response = await apiClient.get(`/Comment/${id}`)
        return response.data
    },

    async getByUserId(id: string): Promise<CommentDTO> {
        const response = await apiClient.get(`/Comment/user/${id}`)
        return response.data
    }
}