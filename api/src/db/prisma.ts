// src/db/prisma.ts
import { PrismaClient } from "../generated/prisma/client.js"; // adjust path if different

export const prisma = new PrismaClient();
