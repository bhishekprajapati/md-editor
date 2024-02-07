import { getPrismaInstance } from "~/lib/prisma";

export default defineEventHandler(async (event) =>
  authProtected(event, async (user) => {
    const prisma = getPrismaInstance();
    const res = await prisma.user.findUniqueOrThrow({
      where: {
        id: user.id,
      },
      select: {
        files: true,
      },
    });

    return res.files;
  }),
);
