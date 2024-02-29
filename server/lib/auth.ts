import type { H3Event } from "h3";
import type { Session, User } from "lucia";

import env from "~/env";
import { GitHub } from "arctic";
import { Lucia, TimeSpan, verifyRequestOrigin } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { prisma } from "~/server/lib/db";
import { TRPCError } from "@trpc/server";

export const github = new GitHub(
  env.secrets.github.client,
  env.secrets.github.secret,
);

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

const adapter = new PrismaAdapter(prisma.session, prisma.user);
export const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(1, "w"), // 1 week
  sessionCookie: {
    attributes: {
      secure: !import.meta.dev,
    },
  },
  getUserAttributes: (attrs) => ({
    githubId: attrs.githubId,
    githubUsername: attrs.githubUsername,
  }),
});

export async function getSession(event: H3Event) {
  const ctx = {
    session: null as Session | null,
    user: null as User | null,
  };

  const sessionId = getCookie(event, lucia.sessionCookieName) ?? null;
  if (!sessionId) {
    return ctx;
  }

  const { session, user } = await lucia.validateSession(sessionId);
  if (session && session.fresh) {
    appendResponseHeader(
      event,
      "Set-Cookie",
      lucia.createSessionCookie(session.id).serialize(),
    );
  }

  if (!session) {
    appendResponseHeader(
      event,
      "Set-Cookie",
      lucia.createBlankSessionCookie().serialize(),
    );
  }

  ctx.session = session;
  ctx.user = user;
  return ctx;
}

export async function csrf(event: H3Event) {
  const originHeader = getHeader(event, "Origin") ?? null;
  const hostHeader = getHeader(event, "Host") ?? null;
  if (
    !originHeader ||
    !hostHeader ||
    !verifyRequestOrigin(originHeader, [hostHeader])
  ) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
}
