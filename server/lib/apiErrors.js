export const apiErrors = {
  ValidationError: (event, { message = "Invalid input" }) =>
    sendError(
      event,
      createError({
        statusCode: 400,
        statusText: "Bad request",
        statusMessage: message,
      }),
    ),

  NotFoundError: (event, { message = "Not found" }) =>
    sendError(
      event,
      createError({
        statusCode: 404,
        statusText: "Not found",
        statusMessage: message,
      }),
    ),

  ForbiddenError: (event, { message = "" }) =>
    sendError(
      event,
      createError({
        statusCode: 403,
        statusText: "Forbidden",
        statusMessage: message,
      }),
    ),
};
