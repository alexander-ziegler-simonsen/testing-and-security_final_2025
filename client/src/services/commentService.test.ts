import { describe, test, expect, vi, beforeEach } from "vitest";
import { commentService } from "./commentService";
import apiClient from "./apiClient";

// MOCK apiClient
vi.mock("./apiClient", () => ({ default: { get: vi.fn() } }));

describe("commentService", () => {

    beforeEach(() => { vi.clearAllMocks(); });

    test("should fetch all comments", async () => {
        // Arrange
        const mockComments = [ { id: 1, content: "Test comment", fk_user_id: 2 } ];

        (apiClient.get as any).mockResolvedValue({ data: mockComments });

        // Act
        const result = await commentService.getAll();

        // Assert
        expect(apiClient.get).toHaveBeenCalledWith("/Comment");
        expect(result).toEqual(mockComments);
    });

    test("should fetch comment by id", async () => {
        // Arrange
        const mockComment = { id: 1, content: "Single comment", fk_user_id: 2 };

        (apiClient.get as any).mockResolvedValue({ data: mockComment });

        // Act
        const result = await commentService.getById("1");

        // Assert
        expect(apiClient.get).toHaveBeenCalledWith("/Comment/1");
        expect(result).toEqual(mockComment);
    });

    test("should fetch comment by user id", async () => {
        // Arrange
        const mockComment = { id: 5, content: "User comment", fk_user_id: 7 };

        (apiClient.get as any).mockResolvedValue({ data: mockComment });

        // Act
        const result = await commentService.getByUserId("7");

        // Assert
        expect(apiClient.get).toHaveBeenCalledWith("/Comment/user/7");
        expect(result).toEqual(mockComment);
    });

});