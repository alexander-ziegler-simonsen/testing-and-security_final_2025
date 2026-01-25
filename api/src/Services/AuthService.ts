//import { MainPrisma } from "../lib/MainPrisma";
import { db } from "../lib/MainDrizzle";
//import { users } from "../db/schema";
import { verifyPassword } from "../utils/auth";
import { signToken } from "../utils/jwt";

export const loginService = async (email: string, password: string) => {
    const user = await db.query.users.findFirst({
        where: (users, {eq}) => eq(users.email, email)
    });

    if (!user) {
        throw new Error("INVALID_CREDENTIALS");
    }

    const isValid = await verifyPassword(
        password, user.salt, user.hashedpassword);
    if (!isValid) {
        throw new Error("INVALID_CREDENTIALS");
    }

    // TODO - fix this . roles should be read from the database
    const token = signToken({ userId: user.id, role: user.user_role });

    return {
        token,
        userId: user.id,
    };
};
