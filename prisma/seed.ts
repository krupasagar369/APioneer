import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "pioneerbusinesssolutions22@gmail.com";
  const password = "Pioneer$369";
  const hashed = await bcrypt.hash(password, 10);

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    await prisma.user.update({
      where: { email },
      data: { password: hashed },
    });
    console.log(`Updated existing admin user: ${email}`);
  } else {
    await prisma.user.create({
      data: { email, password: hashed, name: "Admin", role: "admin" },
    });
    console.log(`Created admin user: ${email}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });