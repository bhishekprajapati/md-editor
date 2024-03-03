import { StatusCodes, getReasonPhrase } from "http-status-codes";

export default defineEventHandler(async (event) => {
  const { user } = event.context;
  if (!user) {
    const code = StatusCodes.UNAUTHORIZED;
    throw createError({
      statusCode: code,
      statusMessage: getReasonPhrase(code),
    });
  }
  return user;
});
