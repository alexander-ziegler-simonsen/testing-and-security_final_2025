//import { MainPrisma } from "../lib/MainPrisma";
import { db } from "../lib/MainDrizzle";
import { comments} from "../db/schema";
import { eq } from "drizzle-orm";
import { CommentCreateSchema, CommentResponseSchema, CommentCreateDTO, CommentUpdateDTO } from "../schemas/CommentSchema";

import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';

const selectSchema = createSelectSchema(comments);
const selectFliterSchema = createSelectSchema(comments).pick({fkProductId: true});
const deleteFliterSchema = createSelectSchema(comments).pick({id: true});
const addSchema = createInsertSchema(comments);
const updateSchema = createUpdateSchema(comments);


export const createComment = async (input: CommentCreateDTO) => {
    const newComment = addSchema.parse(input);
    return await db.insert(comments).values(newComment);
};

export const getComments = async () => {
    const Comments = await db.select().from(comments);
    return selectSchema.array().parse(Comments);
};

export const getCommentById = async (fk_Pro_Id: number) => {
    const validFkProductId  = selectFliterSchema.parse(fk_Pro_Id);
    const rows = await db.select().from(comments).where(eq(comments.fkProductId, validFkProductId.fkProductId));

    return selectSchema.array().parse(rows);
};

export const updateComment = async (id: number, data: CommentUpdateDTO) => {
    const updatedComment = updateSchema.parse(data);
    const newComment = await db.update(comments).set(updatedComment).where(eq(comments.id, id))
    return selectSchema.parse(newComment);
};

export const deleteComment = async (id: number) => {
    const deletedComment = deleteFliterSchema.parse(id);
    const result = await db.delete(comments).where(eq(comments.id, deletedComment.id));
    
    return result;
}