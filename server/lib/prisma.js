import { PrismaClient } from "@prisma/client";

let instance;

/**
 * @returns {PrismaClient}
 */
export const prisma = (function () {
  if (instance) {
    return instance;
  }

  return (instance = new PrismaClient());
})();
