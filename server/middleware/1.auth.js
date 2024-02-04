import { serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  if (event.path.startsWith("/api")) {
    const user = await serverSupabaseUser(event);

    if (!user) {
      return setResponseStatus(event, 401);
    }

    event.context.user = user;
  }
});
