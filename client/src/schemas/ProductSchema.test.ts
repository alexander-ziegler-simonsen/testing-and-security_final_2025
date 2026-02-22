import { describe, expect, test } from "vitest";
import { ProductSchema, ProductCardDTO, ProductCardSchema,ProductDTO } from "./ProductSchema";


const validCases = [
    { name: "100 kr, 2 images", input: { id: 1, title: "MacBook", description: "Almost new", price: "100", images: ["img1.jpg", "img2.jpg"] }, expectedPrice: 100, expectedCount: 2 },
    { name: "0 kr, 3 images", input: { id: 2, title: "Free item", description: "Promo", price: "0", images: ["a.jpg", "b.jpg", "c.jpg"] }, expectedPrice: 0, expectedCount: 3 },
    { name: "300 kr, 0 images", input: { id: 3, title: "Xbox", description: "Used", price: "300", images: [] }, expectedPrice: 300, expectedCount: 0 },
    { name: "default images applied", input: { id: 4, title: "No Images", description: "Missing images field", price: "500" }, expectedPrice: 500, expectedCount: 0 },
];

describe("ProductSchema", () => {
    // positive test
    // Arrange
    test.each(validCases)(
        "$name",
        ({ input, expectedPrice, expectedCount }) => {
            const result = ProductSchema.parse(input);

            // assert
        expect(result.id).toBe(input.id);
            expect(result.title).toBe(input.title);
            expect(result.description).toBe(input.description);
            expect(result.price).toBe(expectedPrice);
            expect(typeof result.price).toBe("number");
            expect(result.images.length).toBe(expectedCount);
        }
    );

    // negative test
    test("throws error when missing required field", () => {
        const input = { id: 10, description: "Missing title", price: "100" };

        const result = ProductSchema.safeParse(input);
        
        expect(result.success).toBe(false);
    });

    test("throws error when price is not a string", () => {
        const input = { id: 11, title: "Invalid", description: "Wrong price type", price: 100 };

        const result = ProductSchema.safeParse(input);
        
        expect(result.success).toBe(false);
    });

    test("throws error when title is empty", () => {
        const input = { id: 12, title: "", description: "Invalid title", price: "100" };

        const result = ProductSchema.safeParse(input);
        
        expect(result.success).toBe(false);
    });
});