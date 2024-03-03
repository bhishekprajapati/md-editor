import type { Session, User } from "lucia";
import { lucia, isCsrf } from "~/server/lib/auth";

export default defineEventHandler(async (event) => {
  // csrf protection
  const shouldBlock = isCsrf(event);
  if (event.path.startsWith("/api/auth") && !(event.method === "GET")) {
    if (shouldBlock) {
      return sendNoContent(event, 403);
    }
  }

  // extend context object
  event.context.lucia = lucia;
  event.context.isCsrf = shouldBlock; // for trpc procedures

  const sessionId = getCookie(event, lucia.sessionCookieName);
  if (!sessionId) {
    event.context.session = null;
    event.context.user = null;
    return;
  }

  const { session, user } = await lucia.validateSession(sessionId);
  if (session && session.fresh) {
    appendResponseHeader(
      event,
      "Set-Cookie",
      lucia.createBlankSessionCookie().serialize(),
    );
  }

  if (!session) {
    appendResponseHeader(
      event,
      "Set-Cookie",
      lucia.createBlankSessionCookie().serialize(),
    );
  }

  event.context.session = session;
  event.context.user = user;
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  githubId: number;
  githubUsername: string;
}

declare module "h3" {
  interface H3EventContext {
    user: User | null;
    session: Session | null;
    lucia: typeof lucia;
    isCsrf: boolean;
  }
}
