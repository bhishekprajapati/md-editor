import { z } from "zod";
import { getPrismaInstance } from "~/lib/prisma";

const schema = z.string().trim().uuid();

export default defineEventHandler(async (event) => {
  const fileId = schema.safeParse(getQuery(event)?.id);

  if (!fileId.success) {
    return setResponseStatus(event, 400);
  }

  const prisma = getPrismaInstance();
  return await prisma.file.findUniqueOrThrow({
    where: {
      id: fileId.data,
    },
  });
});
