import { serverSupabaseUser } from "#supabase/server";

if (process.env.NODE_ENV === "development") {
  console.info("👉 Server Middleware: `Auth` registered");
}

export default defineEventHandler(async (event) => {
  /**
   * Protected routes
   */
  if (event.path.startsWith("/api")) {
    const user = await serverSupabaseUser(event);
    event.context.user = user;

    if (!user) {
      sendError(
        event,
        createError({
          statusCode: "401",
          statusText: "Unauthorized",
        }),
      );
    }
  }
});
