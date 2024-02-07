import { ZodError, z } from "zod";
import { getPrismaInstance } from "~/lib/prisma";

const fileSchema = z.object({
  id: z.string().trim().uuid(),
  private: z.boolean().optional(),
  name: z.string().trim().min(8).max(25).optional(),
  content: z.string().trim().max(2000).optional(),
});

export default defineEventHandler(async (event) =>
  authProtected(event, async (user) => {
    const { id, ...data } = await fileSchema.parseAsync(await readBody(event));
    const prisma = getPrismaInstance();
    return await prisma.file.update({
      where: {
        id,
        userId: user.id,
      },
      data,
    });
  }),
);
