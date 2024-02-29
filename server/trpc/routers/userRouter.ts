import { getSession } from "~/server/lib/auth";
import { publicProcedure, router } from "~/server/trpc/trpc";

export const userRouter = router({
  me: publicProcedure.query(
    async ({ ctx }) => (await getSession(ctx.event)).user,
  ),
});
