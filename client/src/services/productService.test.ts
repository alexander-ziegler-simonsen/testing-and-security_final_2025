import { describe, test, expect, vi, beforeEach } from "vitest";
import { productService } from "./productService";
import apiClient from "./apiClient";
import type { Mock } from "vitest";

// Mock apiClient
vi.mock("./apiClient", () => ({
    default: { get: vi.fn() }
}));

describe("productService", () => {

    beforeEach(() => { vi.clearAllMocks(); });

    test("should fetch all products", async () => {
        // Arrange
        const mockProducts = [
            { id: 1, name: "Product A" }, 
            { id: 2, name: "Product B" }
        ];

        (apiClient.get as Mock).mockResolvedValue({ data: mockProducts });

        // Act
        const result = await productService.getAll();

        // Assert
        expect(apiClient.get).toHaveBeenCalledWith("/Product/");
        expect(result).toEqual(mockProducts);
    });

    test("should fetch product by id", async () => {
        // Arrange
        const mockProduct = { id: 1, name: "Product A" };

        (apiClient.get as Mock).mockResolvedValue({ data: mockProduct });

        // Act
        const result = await productService.getById("1");

        // Assert
        expect(apiClient.get).toHaveBeenCalledWith("/Product/1");
        expect(result).toEqual(mockProduct);
    });

    test("should fetch products by user id", async () => {
        // Arrange
        const mockProduct = { id: 5, name: "User Product" };

        (apiClient.get as Mock).mockResolvedValue({ data: mockProduct });

        // Act
        const result = await productService.getByUserId("5");

        // Assert
        expect(apiClient.get).toHaveBeenCalledWith("/Product/user/5");
        expect(result).toEqual(mockProduct);
    });

    test("should fetch random products", async () => {
        // Arrange
        const mockCards = [
            { id: 1, title: "Random 1" },
            { id: 2, title: "Random 2" }
        ];

        (apiClient.get as Mock).mockResolvedValue({ data: mockCards });

        // Act
        const result = await productService.fetchRandomProducts();

        // Assert
        expect(apiClient.get).toHaveBeenCalledWith("/Product/random");
        expect(result).toEqual(mockCards);
    });

    test("should throw if random products response is null", async () => {
        // Arrange
        (apiClient.get as Mock).mockResolvedValue(null);

        // Act + Assert
        await expect(productService.fetchRandomProducts())
            .rejects
            .toThrow("Failed to load products");
    });

});