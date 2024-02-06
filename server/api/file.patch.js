import { ZodError, z } from "zod";
import { getPrismaInstance } from "~/lib/prisma";

const fileSchema = z.object({
  id: z.string().trim().uuid(),
  name: z.string().trim().min(8).max(25).optional(),
  content: z.string().trim().max(2000).optional(),
});

export default defineEventHandler(async (event) => {
  const { id, ...data } = await fileSchema.parseAsync(await readBody(event));
  const prisma = getPrismaInstance();
  return await prisma.file.update({
    where: {
      id,
    },
    data,
  });
});
