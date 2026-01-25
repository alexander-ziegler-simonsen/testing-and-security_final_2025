// import { Prisma } from "../generated/prisma/client";
// import { MainPrisma } from "../lib/MainPrisma";

import { db } from "../lib/MainDrizzle";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import { UserResponseSchema, UserCreateDTO, UserUpdateDTO } from "../schemas/UserSchema";

const selectSchema = createSelectSchema(users);
const selectIdSchema = createSelectSchema(users).pick({id: true});
const addSchema = createInsertSchema(users);
const updateSchema = createUpdateSchema(users);

export const createUser = async (input: UserCreateDTO) => {
    const newUser = selectSchema.parse(input);
    return await db.insert(users).values(newUser);
    
    // try {
    //     const newUser = await MainPrisma.users.create({ data: input });
    //     return UserResponseSchema.parse(newUser);
    // } catch (err) {
    //     if (
    //         err instanceof Prisma.PrismaClientKnownRequestError &&
    //         err.code === "P2002"
    //     ) {
    //         return null;
    //     }
    //     throw err;
    // }
};

export const getUsers = async () => {
    const Users = await db.select().from(users);
    return selectSchema.array().parse(Users);
};

export const getUserById = async (id: number) => {
    const userId = selectIdSchema.parse(id);
    const oneUser = await db.select().from(users).where(eq(users.id, userId.id));
    return selectSchema.parse(oneUser);
};

export const updateUser = async (id: number, data: UserUpdateDTO) => {
    const updatedUser = updateSchema.parse(data);
    const newUser = await db.update(users).set(updatedUser).where(eq(users.id, id));
    return selectSchema.parse(newUser);
};

export const deleteUser = async (id: number) => {
    const deletedUser = selectIdSchema.parse(id);
    const result = await db.delete(users).where(eq(users.id, deletedUser.id));
    return result;
}