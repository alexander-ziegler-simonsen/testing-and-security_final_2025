import { describe, expect, test } from "vitest";
import { ProductImageSchema } from "./ProductImageSchema";


const validCases = [
    { name: "valid image", input: { id: 1, fk_product_id: 10, imagepath: "image1.jpg" } },
    { name: "another valid image", input: { id: 2, fk_product_id: 11, imagepath: "/uploads/product2.png" } }, 
];

describe("ProductImageSchema", () => {
    // positive test
    // Arrange
    test.each(validCases)("$name", ({ input }) => {
        // Act
        const result = ProductImageSchema.parse(input);

        // assert
        expect(result.id).toBe(input.id);
        expect(result.fk_product_id).toBe(input.fk_product_id);
        expect(result.imagepath).toBe(input.imagepath);

        expect(typeof result.id).toBe("number");
        expect(typeof result.fk_product_id).toBe("number");
        expect(typeof result.imagepath).toBe("string");
    });

    // negative test

    test("fails when id is missing", () => {
        const input: unknown = { fk_product_id: 1, imagepath: "img.jpg" };

        const result = ProductImageSchema.safeParse(input);
        expect(result.success).toBe(false);
    });

    test("fails when fk_product_id is missing", () => {
        const input: unknown = { id: 1, imagepath: "img.jpg" };

        const result = ProductImageSchema.safeParse(input);
        expect(result.success).toBe(false);
    });

    test("fails when imagepath is missing", () => {
        const input: unknown = { id: 1, fk_product_id: 10 };

        const result = ProductImageSchema.safeParse(input);
        expect(result.success).toBe(false);
    });

    test("fails when id is not a number", () => {
        const input: unknown = { id: "1", fk_product_id: 10, imagepath: "img.jpg" };

        const result = ProductImageSchema.safeParse(input);
        expect(result.success).toBe(false);
    });

    test("fails when fk_product_id is not a number", () => {
        const input: unknown = { id: 1, fk_product_id: "10", imagepath: "img.jpg" };

        const result = ProductImageSchema.safeParse(input);
        expect(result.success).toBe(false);
    });

    test("fails when imagepath is not a string", () => {
        const input: unknown = { id: 1, fk_product_id: 10, imagepath: 123 };

        const result = ProductImageSchema.safeParse(input);
        expect(result.success).toBe(false);
    });
});