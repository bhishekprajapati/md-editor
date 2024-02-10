import { getPrismaInstance } from "~/lib/prisma";
import { fileCreationSchema } from "~/utils/validators";

export default defineEventHandler(async (event) =>
  authProtected(event, async (user) => {
    const payload = fileCreationSchema.safeParse(await readBody(event));

    if (!payload.success) {
      return setResponseStatus(event, 400);
    }

    const prisma = getPrismaInstance();

    return await prisma.file.create({
      data: {
        userId: user.id,
        ...payload.data,
      },
    });
  }),
);
