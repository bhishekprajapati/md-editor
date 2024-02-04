import { getPrismaInstance } from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const prisma = getPrismaInstance();
  return await prisma.file.findMany({});
});
