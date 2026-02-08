import { Prisma } from "../generated/prisma/client";
import { MainPrisma } from "../lib/MainPrisma";
import {
    UserResponsePublicSchema,
    UserRegisterRequestPublicDTO, UserUpdatePublicDTO,
    UserRegisterInternalSchema,
    UserRegisterInternalDTO
} from "../schemas/UserSchema";
import { hashPassword } from "../utils/auth";

import { db } from "../lib/MainDrizzle";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';

        const tempUser = {
            username: input.username,
            hashedpassword: tempHashedPass,
            salt: tempSalt,
            firstname: input.firstname,
            lastname: input.lastname,
            email: input.email,
            phone: input.phone,
            signedup: tempDateNow
        }

export const createUser = async (input: any) => {
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
    const users = await MainPrisma.users.findMany();
    return users.map((u) => UserResponsePublicSchema.parse(u));
};

export const getUserById = async (id: number) => {
    const user = await MainPrisma.users.findUnique({ where: { id } });
    return user ? UserResponsePublicSchema.parse(user) : null;
};

export const updateUser = async (id: number, data: any) => {
    const updatedUser = updateSchema.parse(data);
    const newUser = await db.update(users).set(updatedUser).where(eq(users.id, id));
    return selectSchema.parse(newUser);
};

export const deleteUser = async (id: number) => {
    const deletedUser = await MainPrisma.users.delete({ where: { id } });
    return UserResponsePublicSchema.parse(deletedUser);
}