import type { H3Event } from "h3";
import { GitHub } from "arctic";
import { Lucia, TimeSpan, verifyRequestOrigin } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";

import env from "~/env";
import { prisma } from "~/server/lib/db";

export const github = new GitHub(
  env.secrets.github.client,
  env.secrets.github.secret,
);

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

export const isCsrf = (event: H3Event) => {
  const originHeader = getHeader(event, "Origin") ?? null;
  const hostHeader = getHeader(event, "Host") ?? null;
  if (
    !originHeader ||
    !hostHeader ||
    !verifyRequestOrigin(originHeader, [hostHeader])
  ) {
    return true;
  }
  return false;
};
