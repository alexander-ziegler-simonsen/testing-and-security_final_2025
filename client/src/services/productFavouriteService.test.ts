import { describe, test, expect, vi, beforeEach } from "vitest";
import { productFavoriteService } from "./productFavouriteService";
import apiClient from "./apiClient";
import type { Mock } from "vitest";

// Mock apiClient
vi.mock("./apiClient", () => ({
    default: {
        get: vi.fn()
    }
}));

describe("productFavoriteService", () => {

    beforeEach(() => { vi.clearAllMocks(); });

    test("should fetch all product favorites", async () => {
        // Arrange
        const mockFavorites = [
            { id: 1, fk_user_id: 2, fk_product_id: 10 },
            { id: 2, fk_user_id: 3, fk_product_id: 15 }
        ];

        (apiClient.get as Mock).mockResolvedValue({
            data: mockFavorites
        });

        // Act
        const result = await productFavoriteService.getAll();

        // Assert
        expect(apiClient.get).toHaveBeenCalledWith("/ProductFavorite/");
        expect(result).toEqual(mockFavorites);
    });

    test("should fetch product favorite by id", async () => {
        // Arrange
        const mockFavorite = { id: 5, fk_user_id: 99, fk_product_id: 42 };

        (apiClient.get as Mock).mockResolvedValue({ data: mockFavorite });

        // Act
        const result = await productFavoriteService.getById("5");

        // Assert
        expect(apiClient.get).toHaveBeenCalledWith("/ProductFavorite/5");
        expect(result).toEqual(mockFavorite);
    });

    test("should fetch product favorites by user id", async () => {
        // Arrange
        const mockFavorite = { id: 7, fk_user_id: 100, fk_product_id: 88 };

        (apiClient.get as Mock).mockResolvedValue({ data: mockFavorite });

        // Act
        const result = await productFavoriteService.getByUserId("100");

        // Assert
        expect(apiClient.get).toHaveBeenCalledWith("/ProductFavorite/user/100");
        expect(result).toEqual(mockFavorite);
    });

    test("should throw if API call fails", async () => {
        // Arrange
        (apiClient.get as Mock).mockRejectedValue( new Error("Network error") );

        // Act + Assert
        await expect(productFavoriteService.getAll())
            .rejects
            .toThrow("Network error");
    });

});