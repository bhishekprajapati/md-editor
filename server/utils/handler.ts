import { isError } from "h3";
import type { EventHandler, EventHandlerRequest } from "h3";
import consola from "consola";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

/**
 * The centralized error handling mechanism
 * for api route handlers
 */
export default function defineSafeEventHandler(
  handler: EventHandler<EventHandlerRequest, Promise<any>>,
) {
  return defineEventHandler(async (event) => {
    try {
      return await handler(event);
    } catch (err: any) {
      const debug = process.env.NODE_ENV !== "production";

      debug && consola.error(err);
      if (isError(err)) {
        return sendError(event, err, debug);
      }

      const defaultCode = StatusCodes.INTERNAL_SERVER_ERROR;
      return sendError(
        event,
        createError({
          statusCode: defaultCode,
          statusMessage: getReasonPhrase(defaultCode),
          message: "Server encountered an error.",
        }),
        debug,
      );
    }
  });
}
