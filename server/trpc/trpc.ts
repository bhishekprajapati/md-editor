import { TRPCError, initTRPC } from "@trpc/server";
import type { Context } from "~/server/trpc/context";

const t = initTRPC.context<Context>().create();

const csrfProtectedProcedure: Parameters<typeof t.procedure.use>[0] = ({
  ctx,
  type,
  next,
}) => {
  if (type === "mutation" && ctx.isCsrf) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next();
};

export const publicProcedure = t.procedure.use(csrfProtectedProcedure);
export const protectedProcedure = t.procedure
  .use(csrfProtectedProcedure)
  .use(({ ctx, next }) => {
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
