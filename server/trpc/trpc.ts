/**
 * This is your entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app.
 * - We export only the functionality that we use so we can enforce which base procedures should be used
 *
 * Learn how to create protected base procedures and other things below:
 * @see https://trpc.io/docs/v10/router
 * @see https://trpc.io/docs/v10/procedures
 */

import { TRPCError, initTRPC } from "@trpc/server";
import type { Context } from "~/server/trpc/context";

const t = initTRPC.context<Context>().create();

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (ctx.session && ctx.user) {
    return next({
      ctx: {
        user: ctx.user,
      },
    });
  } else {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
});
export const router = t.router;
export const middleware = t.middleware;
