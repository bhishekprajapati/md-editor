import { serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  if (event.path.startsWith("/api")) {
    const user = await serverSupabaseUser(event);
    event.context.user = user;
  } else event.context.user = null;
});
