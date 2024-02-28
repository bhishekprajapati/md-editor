import { router } from "~/server/trpc/trpc";
import { filesRouter } from "~/server/trpc/routers/filesRouter";

export const appRouter = router({
  files: filesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
