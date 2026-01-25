import express from 'express';
import { UserRegisterRequestPublicSchema, UserUpdatePublicSchema } from '../schemas/UserSchema';

import { createUserHandler, updateUserHandler, getUserByIdHandler, getUsersHandler, deleteUserHandler } from '../Controllers/UserController';
import { validate } from '../middleware/validate';

const userRoutes = express.Router();

userRoutes.post("/", validate(UserRegisterRequestPublicSchema), createUserHandler);    // create one
userRoutes.get("/:id", getUserByIdHandler);                             // read one
userRoutes.get("/", getUsersHandler);                                   // read all
userRoutes.put("/:id", validate(UserUpdatePublicSchema), updateUserHandler);  // update one
userRoutes.delete("/:id", deleteUserHandler);                            // delete one

export default userRoutes;