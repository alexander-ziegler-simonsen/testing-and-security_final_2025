import { describe, expect, test } from "vitest";
import { CommentSchema } from "./CommentSchema";



const validCases = [
    { name: "valid public comment", input: { id: 1, content: "Great product!", fk_product_id: 10, fk_user_id: 5, _public: true, }, },
    { name: "valid private comment", input: { id: 2, content: "Internal review", fk_product_id: 11, fk_user_id: 7, _public: false, }, },
    { name: "long content comment", input: { id: 3, content: "This is a very detailed review of the product and it works perfectly.", fk_product_id: 12, fk_user_id: 8, _public: true, }, },
];

describe("CommentSchema", () => {
    // positive test
    // Arrange
    test.each(validCases)("$name", ({ input }) => {
        // Act
        const result = CommentSchema.parse(input);

        // assert
        expect(result.id).toBe(input.id);
        expect(result.content).toBe(input.content);
        expect(result.fk_product_id).toBe(input.fk_product_id);
        expect(result.fk_user_id).toBe(input.fk_user_id);
        expect(result._public).toBe(input._public);

        expect(typeof result.id).toBe("number");
        expect(typeof result.content).toBe("string");
        expect(typeof result.fk_product_id).toBe("number");
        expect(typeof result.fk_user_id).toBe("number");
        expect(typeof result._public).toBe("boolean");
    });

    // negative test

    test("throws error when missing required field", () => {
        const input = { id: 10, fk_product_id: 1, fk_user_id: 2, _public: true }; 

        expect(() => CommentSchema.parse(input)).toThrow();
    });

    test("throws error when content is empty", () => {
        const input = { id: 11, content: "", fk_product_id: 1, fk_user_id: 2, _public: true };

        expect(() => CommentSchema.parse(input)).toThrow();
    });

    test("throws error when id is not a number", () => {
        const input = { id: "1", content: "Invalid id", fk_product_id: 1, fk_user_id: 2, _public: true };

        expect(() => CommentSchema.parse(input)).toThrow();
    });

    test("throws error when _public is not boolean", () => {
        const input = { id: 12, content: "Invalid boolean", fk_product_id: 1, fk_user_id: 2, _public: "true" };

        expect(() => CommentSchema.parse(input)).toThrow();
    });
});