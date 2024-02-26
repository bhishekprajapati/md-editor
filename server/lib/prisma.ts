import { PrismaClient } from "@prisma/client";

let instance: PrismaClient | null = null;
export const prisma: PrismaClient = (function () {
  if (instance) {
    return instance;
  }

  return (instance = new PrismaClient());
})();
