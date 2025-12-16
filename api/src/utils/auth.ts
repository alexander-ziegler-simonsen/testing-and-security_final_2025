// import bcrypt from "bcrypt";

// export const hashPassword = (password: string) => bcrypt.hash(password, 10);

// export const verifyPassword = (password: string, hash: string) => bcrypt.compare(password, hash);

import crypto from "crypto";

const PASSWORD_SECRET = process.env.PEPPER_SECRET;

if (!PASSWORD_SECRET) {
    throw new Error("PASSWORD_SECRET is not set");
}

export const hashPassword = (password: string, salt: string) => {
    return crypto
        .createHash("sha256")
        .update(PASSWORD_SECRET + salt + password)
        .digest("hex");
};

export const verifyPassword = (
    password: string,
    salt: string,
    hashedPassword: string
) => {
    const hash = hashPassword(password, salt);
    return hash === hashedPassword;
};
