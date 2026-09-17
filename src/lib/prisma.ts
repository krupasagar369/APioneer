import { PrismaClient } from "../generated/prisma/client";

// Standard Next.js pattern: in dev, hot-reload would otherwise create a new
// PrismaClient (and a new DB connection pool) on every file change. Stashing
// it on the global object keeps a single instance across reloads.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}