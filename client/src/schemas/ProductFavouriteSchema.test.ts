import { describe, expect, test } from "vitest";
import { ProductFavouriteSchema } from "./ProductFavouriteSchema";


const validCases = [
    { name: "valid favourite", input: { id: 1, fk_user_id: 10, fk_product_id: 100 } },
    { name: "another valid favourite", input: { id: 2, fk_user_id: 11, fk_product_id: 101 } },
];

describe("ProductFavouriteSchema", () => {
    
    // positive test
    // Arrange
    test.each(validCases)("$name", ({ input }) => {
        // Act
        const result = ProductFavouriteSchema.parse(input);

        // assert
        expect(result.id).toBe(input.id);
        expect(result.fk_user_id).toBe(input.fk_user_id);
        expect(result.fk_product_id).toBe(input.fk_product_id);

        expect(typeof result.id).toBe("number");
        expect(typeof result.fk_user_id).toBe("number");
        expect(typeof result.fk_product_id).toBe("number");
    });

    // negative test

    test("throws error when id is missing", () => {
        const input = { fk_user_id: 1, fk_product_id: 2 };

        const result = ProductFavouriteSchema.safeParse(input);
        
        expect(result.success).toBe(false);
    });

    test("throws error when fk_user_id is missing", () => {
        const input = { id: 3, fk_product_id: 2 };

        const result = ProductFavouriteSchema.safeParse(input);
        
        expect(result.success).toBe(false);
    });

    test("throws error when fk_product_id is missing", () => {
        const input = { id: 4, fk_user_id: 1 };

        const result = ProductFavouriteSchema.safeParse(input);
        
        expect(result.success).toBe(false);
    });

    test("throws error when id is not a number", () => {
        const input = { id: "1", fk_user_id: 1, fk_product_id: 2 };

        const result = ProductFavouriteSchema.safeParse(input);
        
        expect(result.success).toBe(false);
    });

    test("throws error when fk_user_id is not a number", () => {
        const input = { id: 5, fk_user_id: "10", fk_product_id: 2 };

        const result = ProductFavouriteSchema.safeParse(input);

        expect(result.success).toBe(false);
    });

    test("throws error when fk_product_id is not a number", () => {
        const input = { id: 6, fk_user_id: 10, fk_product_id: "2" };

        const result = ProductFavouriteSchema.safeParse(input);

        expect(result.success).toBe(false);

    });

    test("throws error when any field is null", () => {
        const input = { id: 7, fk_user_id: null, fk_product_id: null };

        const result = ProductFavouriteSchema.safeParse(input);

        expect(result.success).toBe(false);
    });
});