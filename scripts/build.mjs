import { execSync } from "node:child_process";

// Build DATABASE_URL from GoDaddy's injected DB_* vars, if not already set
if (!process.env.DATABASE_URL && process.env.DB_HOST) {
  process.env.DATABASE_URL = `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  console.log("DATABASE_URL constructed from DB_* environment variables.");
} else if (!process.env.DATABASE_URL) {
  console.warn("Warning: DATABASE_URL is not set and no DB_HOST was found.");
}

// Run migrations, then build — both inherit process.env, including DATABASE_URL
execSync("npx prisma migrate deploy", { stdio: "inherit" });
execSync("next build", { stdio: "inherit" });