// import { PrismaClient } from "../generated/prisma/client";

// Standard Next.js pattern: in dev, hot-reload would otherwise create a new
// PrismaClient (and a new DB connection pool) on every file change. Stashing
// it on the global object keeps a single instance across reloads.
// const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma;
// }

import { PrismaClient } from "../generated/prisma/client";

// Build DATABASE_URL from GoDaddy's injected DB_* vars if it isn't already set
// (GoDaddy's Hosted Database injects DB_HOST/DB_PORT/DB_NAME/DB_USER/DB_PASSWORD,
// not a single DATABASE_URL).
if (!process.env.DATABASE_URL && process.env.DB_HOST) {
  process.env.DATABASE_URL = `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
}

// Standard Next.js pattern: in dev, hot-reload would otherwise create a new
// PrismaClient (and a new DB connection pool) on every file change. Stashing
// it on the global object keeps a single instance across reloads.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}