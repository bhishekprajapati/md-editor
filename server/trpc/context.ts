import { type inferAsyncReturnType } from "@trpc/server";
import type { H3Event } from "h3";

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(event: H3Event) {
  return { event, ...event.context };
}

export type Context = inferAsyncReturnType<typeof createContext>;
