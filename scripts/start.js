/* eslint-disable @typescript-eslint/no-require-imports */
const { execSync } = require("node:child_process");

// Always rebuild DATABASE_URL from GoDaddy's injected DB_* vars at runtime,
// overriding any placeholder DATABASE_URL set for build-time validation.
if (process.env.DB_HOST) {
  process.env.DATABASE_URL = `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  console.log("DATABASE_URL constructed from DB_* environment variables.");
} else if (!process.env.DATABASE_URL) {
  console.warn("Warning: DATABASE_URL is not set and no DB_HOST was found.");
}

// Sync the schema straight to the database (creates the Workshop and Webinar
// tables if missing). Uses db push instead of migrate deploy because the old
// migration history was written for PostgreSQL and can't be applied to MySQL.
// The client was already generated during the build, so skip regenerating it.
execSync("npx prisma db push --skip-generate", { stdio: "inherit" });
execSync("next start", { stdio: "inherit" });