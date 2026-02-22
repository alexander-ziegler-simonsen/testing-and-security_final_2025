import { describe, expect, test } from "vitest";
import { ProductCategorySchema } from "./ProductCategorySchema";


const validCases = [
    { name: "valid root category (null parent)", input: { id: 1, name: "Electronics", fk_pc_parant_id: null } },
    { name: "valid child category", input: { id: 2, name: "Laptops", fk_pc_parant_id: 1 } },
    { name: "category with long name", input: { id: 3, name: "Gaming Accessories and Equipment", fk_pc_parant_id: null },},
];

describe("ProductCategorySchema", () => {
    // positive test
    
    // Arrange
    test.each(validCases)("$name", ({ input }) => {
        // Act
        const result = ProductCategorySchema.parse(input);

        // assert
        expect(result.id).toBe(input.id);
        expect(result.name).toBe(input.name);
        expect(result.fk_pc_parant_id).toBe(input.fk_pc_parant_id);

        expect(typeof result.id).toBe("number");
        expect(typeof result.name).toBe("string");

        if (result.fk_pc_parant_id !== null) {
            expect(typeof result.fk_pc_parant_id).toBe("number");
        } else {
            expect(result.fk_pc_parant_id).toBeNull();
        }
    });

    // negative test
    test("throws error when missing required field", () => {
        const input = { id: 10, fk_pc_parant_id: null }; 

        expect(() => ProductCategorySchema.parse(input)).toThrow();
    });

    test("throws error when id is not a number", () => {
        const input = { id: "1", name: "Invalid", fk_pc_parant_id: null };

        expect(() => ProductCategorySchema.parse(input)).toThrow();
    });

    test("throws error when name is not a string", () => {
        const input = { id: 11, name: 123, fk_pc_parant_id: null };

        expect(() => ProductCategorySchema.parse(input)).toThrow();
    });

    test("throws error when fk_pc_parant_id is not number or null", () => {
        const input = { id: 12, name: "Invalid Parent", fk_pc_parant_id: "1" };

        expect(() => ProductCategorySchema.parse(input)).toThrow();
    });
});