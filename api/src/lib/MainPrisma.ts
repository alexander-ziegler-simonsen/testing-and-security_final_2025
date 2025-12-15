import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'

const connectionString = `${process.env.DATABASE_URL}`

if(!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
}

const adapter = new PrismaPg({ connectionString })
const MainPrisma = new PrismaClient({ adapter })

export { MainPrisma }