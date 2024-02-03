import { getPrismaInstance } from "~/lib/prisma";
import { serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const user = serverSupabaseUser();

  if (!user) {
    return setResponseStatus(event, 401);
  }
  const prisma = getPrismaInstance();
  return await prisma.file.findMany({});
});
