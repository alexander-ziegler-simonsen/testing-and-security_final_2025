import { describe, expect, test } from "vitest";
import { UserSchema } from "./UserSchema";

const validCases = [
    { name: "valid username (exactly 4 chars)", input: { id: 1, username: "john" } },
    { name: "valid username longer than 4", input: { id: 2, username: "john_doe" } },
];

describe("UserSchema", () => {
    // positive test
    // Arrange
    test.each(validCases)("$name", ({ input }) => {
        // Act
        const result = UserSchema.parse(input);

        // assert
        expect(result.id).toBe(input.id);
        expect(result.username).toBe(input.username);

        expect(typeof result.id).toBe("number");
        expect(typeof result.username).toBe("string");
    });

    // negative test
    test("fails when username is too short", () => {
        const input: unknown = { id: 3, username: "abc" };

        const result = UserSchema.safeParse(input);
        expect(result.success).toBe(false);
    });

    test("fails when id is missing", () => { const input: unknown = { username: "validUser" };

        const result = UserSchema.safeParse(input);
        expect(result.success).toBe(false);
    });

    test("fails when username is missing", () => { const input: unknown = { id: 4 };

        const result = UserSchema.safeParse(input);
        expect(result.success).toBe(false);
    });

    test("fails when id is not a number", () => {
        const input: unknown = { id: "1", username: "validUser" };

        const result = UserSchema.safeParse(input);
        expect(result.success).toBe(false);
    });

    test("fails when username is not a string", () => {
        const input: unknown = { id: 5, username: 1234 };

        const result = UserSchema.safeParse(input);
        expect(result.success).toBe(false);
    });
});