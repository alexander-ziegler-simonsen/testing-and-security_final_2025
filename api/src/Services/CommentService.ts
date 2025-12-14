import { MainPrisma } from "../lib/MainPrisma";
import { CommentCreateSchema, CommentResponseSchema, 
    CommentCreateDTO, CommentUpdateDTO } from "../schemas/CommentSchema";

export const createComment = async (input: CommentCreateDTO) => {
    const newComment = await MainPrisma.comments.create({data: input});
    return CommentCreateSchema.parse(newComment);
};

export const getComments = async () => {
    const Comments = await MainPrisma.comments.findMany();
    return Comments.map((u) =>  CommentResponseSchema.parse(u));
};

export const getCommentById = async (id: number) => {
    const Comment = await MainPrisma.comments.findUnique({ where: { id } });
    return Comment ? CommentResponseSchema.parse(Comment) : null;
};

export const updateComment = async (id: number, data: CommentUpdateDTO) => {
    const updatedComment = await MainPrisma.comments.update({ where: { id }, data });
    return CommentResponseSchema.parse(updatedComment)
};

export const deleteComment = async (id: number) => {
    const deletedComment = await MainPrisma.comments.delete({ where: { id } });
    return CommentResponseSchema.parse(deletedComment);
}