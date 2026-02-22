import { describe, it, expect, vi, beforeEach } from "vitest";
import { productImageService } from "./ProductImageService";
import apiClient from "../services/apiClient";
import type { Mock } from "vitest";

// Mock apiClient
vi.mock("./apiClient", () => ({
    default: { get: vi.fn() } 
}));

describe("productImageService", () => {

    beforeEach(() => { vi.clearAllMocks(); });

    it("should fetch all product images", async () => {
        // Arrange
        const mockImages = [
            { id: 1, fk_product_id: 10, image: "image1.jpg" },
            { id: 2, fk_product_id: 11, image: "image2.jpg" }
        ];

        (apiClient.get as Mock).mockResolvedValue({ data: mockImages });

        // Act
        const result = await productImageService.getAll();

        // Assert
        expect(apiClient.get).toHaveBeenCalledWith("/ProductImage/");
        expect(result).toEqual(mockImages);
    });

    it("should fetch product image by id", async () => {
        // Arrange
        const mockImage = { id: 1, fk_product_id: 10, image: "image1.jpg" };

        (apiClient.get as Mock).mockResolvedValue({ data: mockImage });

        // Act
        const result = await productImageService.getById("1");

        // Assert
        expect(apiClient.get).toHaveBeenCalledWith("/ProductImage/1");
        expect(result).toEqual(mockImage);
    });

    it("should throw if API call fails", async () => {
        // Arrange
        (apiClient.get as Mock).mockRejectedValue( new Error("Network error") );

        // Act + Assert
        await expect(productImageService.getAll())
            .rejects
            .toThrow("Network error");
    });

});