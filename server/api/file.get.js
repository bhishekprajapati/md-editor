import { z } from "zod";
import { getPrismaInstance } from "~/lib/prisma";

const schema = z.string().trim().uuid();

export default defineEventHandler(async (event) =>
  authProtected(event, async (user) => {
    // file id validation
    const fileId = schema.safeParse(getQuery(event)?.id);
    if (!fileId.success) {
      return setResponseStatus(event, 400);
    }

    const prisma = getPrismaInstance();
    const { shared } = getQuery(event);

    const file = await prisma.file.findUniqueOrThrow({
      where: {
        id: fileId,
      },
    });

    if (shared) {
      // if is public
      if (!file.private) {
        return file;
      }

      // if restricted access then check
      const haveAccess = await prisma.sharedFile.findUniqueOrThrow({
        where: {
          fileId,
          userId: user.id,
        },
      });

      if (haveAccess) {
        return file;
      }
    }

    // is file owner
    if (file.userId === user.id) {
      return file;
    }

    return setResponseStatus(event, 403);
  }),
);
