import { PrismaClient } from "@prisma/client";
import { issues } from "./seedData";

const prisma = new PrismaClient();

async function main() {
  for (const issue of issues) {
    await prisma.issue.create({
      data: issue,
    });
  }

  console.log("Database has been seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
