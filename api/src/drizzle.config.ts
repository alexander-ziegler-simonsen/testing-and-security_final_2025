import { defineConfig } from "drizzle-kit";
const db_url = process.env.DATABASE_URL || "postgresql://username:password@host:1234/db";

export default defineConfig({
    dialect: "postgresql",
    dbCredentials: {
        url: db_url,
    },
});
