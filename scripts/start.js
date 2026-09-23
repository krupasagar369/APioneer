const { execSync } = require("node:child_process");

// Always rebuild DATABASE_URL from GoDaddy's injected DB_* vars at runtime,
// overriding any placeholder DATABASE_URL set for build-time validation.
if (process.env.DB_HOST) {
  process.env.DATABASE_URL = `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  console.log("DATABASE_URL constructed from DB_* environment variables.");
} else if (!process.env.DATABASE_URL) {
  console.warn("Warning: DATABASE_URL is not set and no DB_HOST was found.");
}

// Run migrations now that the real DATABASE_URL is set, then start the server
execSync("npx prisma migrate deploy", { stdio: "inherit" });
execSync("next start", { stdio: "inherit" });