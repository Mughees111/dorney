/**
 * Prisma seed - creates initial admin user
 * Run: npx prisma db seed
 *
 * Default admin: admin@dorney.com / Admin123!
 * Change in production!
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashed = await bcrypt.hash("Admin123!", 10);
  const admin = await prisma.admin.upsert({
    where: { email: "admin@dorney.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@dorney.com",
      password: hashed,
      role: "admin",
      isActive: true,
    },
  });
  console.log("Admin created/updated:", admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
