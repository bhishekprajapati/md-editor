import { getPrismaInstance } from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  event.context.prisma = getPrismaInstance();
});
