import { PrismaClient } from "@prisma/client";

//pretter-ignore
const prismaClientSingleton = () => {
  return new PrismaClient(
    //{ log: ["query"] } to log everydatabase queries
  );
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
