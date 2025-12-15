import { Request, Response } from "express";
import { createUser, getUsers, getUserById, updateUser, deleteUser } from "../Services/UserService";
import { UserCreateDTO, UserUpdateDTO } from "../schemas/UserSchema";

// create one user

// req                                         {parms}, {resBody}, {reqBody}, ({reqQuery})
export const createUserHandler = async (req: Request<{}, {}, UserCreateDTO>, res: Response) => {
    try {
        const user = await createUser(req.body);
        console.log("user in controller", user);
        if (!user) {
            return res.status(400).json({message: "problems with user inputs"});
        } else {
            return res.status(201).json(user);
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({message: "internal server error" });
    }
};

// read all users
export const getUsersHandler = async (req: Request, res: Response) => {
    return res.json(await getUsers());
};

// read one user
export const getUserByIdHandler = async (req: Request, res: Response) => {
    const user = await getUserById(Number(req.params.id));
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
};

// update one user
export const updateUserHandler = async (
    //                   {parms}, {resBody}, {reqBody}, ({reqQuery})
    req: Request<{ id: string }, {}, UserUpdateDTO>,
    res: Response
) => {
    try {
        const updated = await updateUser(Number(req.params.id), req.body);
        return res.json(updated);
    } catch (err) {
        console.error(err);
        return res.status(404).json({ message: "User not found" });
    }
};

// delete one user
export const deleteUserHandler = async (req: Request<{ id: number }>,
    res: Response
) => {
    try {
        const deleted = await deleteUser(Number(req.params.id));
        return res.json(deleted);
    } catch (err) {
        console.error(err);
        return res.status(404).json({ message: "User not found" });
    }
};