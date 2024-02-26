import { serverSupabaseUser } from "#supabase/server";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

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
          statusCode: StatusCodes.UNAUTHORIZED,
          statusText: getReasonPhrase(StatusCodes.UNAUTHORIZED),
        }),
        process.env.NODE_ENV !== "production",
      );
    }
  }
});
