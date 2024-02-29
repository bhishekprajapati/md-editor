import { router } from "~/server/trpc/trpc";
import { filesRouter } from "~/server/trpc/routers/filesRouter";
import { userRouter } from "~/server/trpc/routers/userRouter";

export const appRouter = router({
  files: filesRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
