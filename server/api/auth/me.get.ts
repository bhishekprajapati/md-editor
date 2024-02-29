import { appRouter } from "~/server/trpc/routers";

export default defineEventHandler(async (event) => {
  const caller = appRouter.createCaller({
    event,
    session: null,
    user: null,
  });

  return await caller.user.me();
});
