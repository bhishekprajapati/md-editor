import { Prisma, PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

const prismaClientSingleton = () => {
  return new PrismaClient({
    errorFormat: "pretty",
    log:
      process.env.NODE_ENV !== "production"
        ? ["error", "info", "query", "warn"]
        : [],
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function dbQuery<R>(
  queryFn: (prisma: PrismaClientSingleton) => Promise<R>,
): ReturnType<typeof queryFn> {
  try {
    return queryFn(prisma);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientUnknownRequestError) {
      throw err;
    }

    if (err instanceof Prisma.PrismaClientValidationError) {
      throw createError({
        statusCode: StatusCodes.BAD_GATEWAY,
        statusMessage: "Validation error.",
      });
    }

    throw err;
  }
}
