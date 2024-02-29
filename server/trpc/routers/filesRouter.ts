import { z } from "zod";
import { StatusCodes } from "http-status-codes";

import {
  publicProcedure,
  protectedProcedure,
  router,
} from "~/server/trpc/trpc";
import { db } from "~/server/lib/db";

export const filesRouter = router({});
