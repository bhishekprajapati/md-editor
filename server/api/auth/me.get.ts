import { getSession } from "~/server/lib/auth";

export default defineEventHandler(async (event) => {
  return (await getSession(event)).user;
});
