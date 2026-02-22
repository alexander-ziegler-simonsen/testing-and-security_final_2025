import { describe, test, expect, vi, beforeEach } from "vitest";
import { productCategoryService } from "./productCategoryService";
import apiClient from "./apiClient";

// Mock apiClient
vi.mock("./apiClient", () => ({ default: { get: vi.fn() } }));

describe("productCategoryService", () => {

    beforeEach(() => { vi.clearAllMocks(); });

    test("should fetch all product categories", async () => {
        // Arrange
        const mockCategories = [ 
            { id: 1, name: "Electronics" },
            { id: 2, name: "Books" }
        ];

        (apiClient.get as any).mockResolvedValue({ data: mockCategories });

        // Act
        const result = await productCategoryService.getAll();

        // Assert
        expect(apiClient.get).toHaveBeenCalledWith("/productCategory/");
        expect(result).toEqual(mockCategories);
    });

    test("should fetch product category by id", async () => {
        // Arrange
        const mockCategory = { id: 1, name: "Electronics" };

        (apiClient.get as any).mockResolvedValue({ data: mockCategory });

        // Act
        const result = await productCategoryService.getById("1");

        // Assert
        expect(apiClient.get).toHaveBeenCalledWith("/productCategory/1");
        expect(result).toEqual(mockCategory);
    });

});