import { z } from "zod";
import { getPrismaInstance } from "~/lib/prisma";

const payloadSchema = z.object({
  content: z.string().trim().max(10000),
});

export default defineEventHandler(async (event) =>
  authProtected(event, async (user) => {
    const payload = payloadSchema.safeParse(await readBody(event));

    if (!payload.success) {
      return setResponseStatus(event, 400, `Invalid payload!`);
    }

    const prisma = getPrismaInstance();

    const record = await prisma.user.upsert({
      where: {
        id: user.id,
      },
      create: {
        id: user.id,
        files: {
          create: {
            content: payload.data.content,
          },
        },
      },
      update: {
        files: {
          create: {
            content: payload.data.content,
          },
        },
      },
    });

    return setResponseStatus(event, 200, "File saved!");
  }),
);
