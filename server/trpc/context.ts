import { type inferAsyncReturnType } from "@trpc/server";
import type { H3Event } from "h3";
import { getSession, csrf } from "~/server/lib/auth";

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(event: H3Event) {
  const ctx = await getSession(event);
  return { ...ctx, event };
}

export type Context = inferAsyncReturnType<typeof createContext>;
