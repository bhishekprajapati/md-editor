import { getPrismaInstance } from "~/lib/prisma";

export default defineEventHandler(async (event) =>
  authProtected(event, async (user) => {
    const fileId = getQuery(event)?.id;
    if (!fileId) {
      return setResponseStatus(event, 400, "Missing id");
    }

    const prisma = getPrismaInstance();
    return await prisma.file.delete({
      where: {
        id: fileId,
        userId: user.id,
      },
    });
  }),
);
