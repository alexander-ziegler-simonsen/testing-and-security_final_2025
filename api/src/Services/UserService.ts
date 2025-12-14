import { Prisma } from "../generated/prisma/client";
import { MainPrisma } from "../lib/MainPrisma";
import {
    UserCreateSchema, UserResponseSchema,
    UserCreateDTO, UserUpdateDTO
} from "../schemas/UserSchema";

export const createUser = async (input: UserCreateDTO) => {
    try {
        const newUser = await MainPrisma.users.create({ data: input });
        return UserResponseSchema.parse(newUser);
    } catch (err) {
        if (
            err instanceof Prisma.PrismaClientKnownRequestError &&
            err.code === "P2002"
        ) {
            return null;
        }
        throw err;
    }
};

export const getUsers = async () => {
    const users = await MainPrisma.users.findMany();
    return users.map((u) => UserResponseSchema.parse(u));
};

export const getUserById = async (id: number) => {
    const user = await MainPrisma.users.findUnique({ where: { id } });
    return user ? UserResponseSchema.parse(user) : null;
};

export const updateUser = async (id: number, data: UserUpdateDTO) => {
    const updatedUser = await MainPrisma.users.update({ where: { id }, data });
    return UserResponseSchema.parse(updatedUser)
};

export const deleteUser = async (id: number) => {
    const deletedUser = await MainPrisma.users.delete({ where: { id } });
    return UserResponseSchema.parse(deletedUser);
}