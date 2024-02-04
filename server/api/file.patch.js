import { z } from "zod";
import { getPrismaInstance } from "~/lib/prisma";

const fileSchema = z.object({
  id: z.string().trim().uuid(),
  name: z.string().trim().min(8).max(25),
  content: z.string().trim().max(2000),
});

export default defineEventHandler(async (event) => {
  const file = await fileSchema.parseAsync(await readBody(event));
  const prisma = getPrismaInstance();
  return await prisma.file.update({
    where: {
      id: file.id,
    },
    data: {
      name: file.name,
      content: file.content,
    },
  });
});
