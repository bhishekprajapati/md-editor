import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/trpc/routers";

export type FileRead = inferRouterOutputs<AppRouter>["files"]["read"];
