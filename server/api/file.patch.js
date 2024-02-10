import { getPrismaInstance } from "~/lib/prisma";
import { filePatchSchema } from "~/utils/validators";

export default defineEventHandler(async (event) =>
  authProtected(event, async (user) => {
    const { id, ...data } = await filePatchSchema.parseAsync(
      await readBody(event),
    );
    const prisma = getPrismaInstance();
    const file = await prisma.file.findUniqueOrThrow({
      where: {
        id,
      },
      select: {
        userId: true,
      },
    });

    // if not a file owner
    if (file.userId !== user.id) {
      return setResponseStatus(event, 403);
    }

    return await prisma.file.update({
      where: {
        id,
        userId: user.id,
      },
      data,
      // only return the mutated fields
      select: {
        id: true,
        name: !!data?.name,
        private: !!data?.private,
        content: !!data?.content,
        updatedAt: true,
      },
    });
  }),
);
