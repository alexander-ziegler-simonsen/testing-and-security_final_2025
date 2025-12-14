import { Request, Response } from "express";
import { createComment, getCommentById, deleteComment, updateComment, getComments } from "../Services/CommentService";
import { CommentCreateDTO, CommentUpdateDTO } from "../schemas/CommentSchema";

// create one Comment
export const createCommentHandler = async (req: Request<{}, {}, CommentCreateDTO>,res: Response) => {
    const Comment = await createComment(req.body);
    return res.status(201).json(Comment);
};

// read all Comments
export const getCommentsHandler = async (req: Request, res: Response) => {
    return res.json(await getComments());
};

// read one Comment
export const getCommentByIdHandler = async (req: Request, res: Response) => {
    const Comment = await getCommentById(Number(req.params.id));
    if (!Comment) {
        return res.status(404).json({ message: "Comment not found" });
    }
    return res.json(Comment);
};

// update one Comment
export const updateCommentHandler = async ( 
//                   {parms}, {resBody}, {reqBody}, ({reqQuery})
    req: Request<{ id: string }, {}, CommentUpdateDTO>,
    res: Response
) => {
    try {
        const updated = await updateComment(Number(req.params.id), req.body);
        return res.json(updated);
    } catch (err) {
        return res.status(404).json({ message: "Comment not found" });
    }
};

// delete one Comment
export const deleteCommentHandler = async ( req: Request<{ id: number }>,
    res: Response
) => {
    try {
        const deleted = await deleteComment(Number(req.params.id));
        return res.json(deleted);
    } catch (err) {
        return res.status(404).json({ message: "Comment not found" });
    }
};