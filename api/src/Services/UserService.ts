import { Prisma } from "../generated/prisma/client";
import { MainPrisma } from "../lib/MainPrisma";
import {
    UserResponsePublicSchema,
    UserRegisterRequestPublicDTO, UserUpdatePublicDTO,
    UserRegisterInternalSchema,
    UserRegisterInternalDTO
} from "../schemas/UserSchema";
import { hashPassword } from "../utils/auth";

export const createUser = async (input: UserRegisterRequestPublicDTO) => {
    try {
        // handling of the password
        const tempSalt = crypto.randomUUID();
        const tempHashedPass = hashPassword(input.password, tempSalt);
        const tempDateNow = new Date();

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

        const newUser = await MainPrisma.users.create({ data: UserRegisterInternalSchema.parse(tempUser) });
        return newUser.id;
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
    return users.map((u) => UserResponsePublicSchema.parse(u));
};

export const getUserById = async (id: number) => {
    const user = await MainPrisma.users.findUnique({ where: { id } });
    return user ? UserResponsePublicSchema.parse(user) : null;
};

export const updateUser = async (id: number, data: UserUpdatePublicDTO) => {
    const updatedUser = await MainPrisma.users.update({ where: { id }, data });
    return UserResponsePublicSchema.parse(updatedUser)
};

export const deleteUser = async (id: number) => {
    const deletedUser = await MainPrisma.users.delete({ where: { id } });
    return UserResponsePublicSchema.parse(deletedUser);
}