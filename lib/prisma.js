import { PrismaClient } from "@prisma/client";

let instance;

/**
 * @returns {PrismaClient}
 */
export function getPrismaInstance() {
  if (instance) {
    return instance;
  }

  return (instance = new PrismaClient());
}
