import { db } from "~/server/lib/db";

export default defineEventHandler(async (event) => {
  event.context.db = db;
});

declare module "h3" {
  interface H3EventContext {
    db: typeof db;
  }
}
