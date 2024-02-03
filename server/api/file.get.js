import { z } from "zod";
import { getPrismaInstance } from "~/lib/prisma";
import { serverSupabaseUser } from "#supabase/server";

const schema = z.string().trim().uuid();

export default defineEventHandler(async (event) => {
  const user = serverSupabaseUser();

  if (!user) {
    return setResponseStatus(event, 401);
  }

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
