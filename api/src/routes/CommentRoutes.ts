import express from 'express';
import { CommentCreateSchema, CommentUpdateSchema } from '../schemas/CommentSchema';

import { createCommentHandler, updateCommentHandler, getCommentByIdHandler, getCommentsHandler, deleteCommentHandler } from '../Controllers/CommentController';
import { validate } from '../middleware/validate';

const commentRoutes = express.Router();

commentRoutes.post("/", validate(CommentCreateSchema), createCommentHandler);    // create one
commentRoutes.get("/:id", getCommentByIdHandler);                             // read one
commentRoutes.get("/", getCommentsHandler);                                   // read all
commentRoutes.put("/:id", validate(CommentUpdateSchema), updateCommentHandler);  // update one
commentRoutes.delete("/:id", deleteCommentHandler);                            // delete one

export default commentRoutes;