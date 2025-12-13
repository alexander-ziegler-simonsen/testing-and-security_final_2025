import { MainPrisma } from "../lib/MainPrisma";
import { UserCreateSchema, UserResponseSchema, 
    UserCreateDTO, UserUpdateDTO } from "../schemas/UserSchema";

export const createUser = async (input: UserCreateDTO) => {
    const newUser = await MainPrisma.users.create({data: input});
    return UserCreateSchema.parse(newUser);
};

export const getUsers = async () => {
    const users = await MainPrisma.users.findMany();
    return users.map((u) =>  UserResponseSchema.parse(u));
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