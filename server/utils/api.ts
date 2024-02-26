import type {
  DataResponse as ApiDataResponse,
  ErrorResponse as ApiErrorResponse,
  Meta,
} from "~/server/api/types";

export const DataResponse = <T>(
  data: T,
  meta: Meta = {},
  message: string = "",
): ApiDataResponse<T> => ({
  data,
  meta,
  error: null,
  message: message,
});

const error = (name: string, message: string) => ({
  data: null,
  error: name,
  message,
});

export const ErrorResponse = (err: unknown): ApiErrorResponse => {
  if (err instanceof Error) {
    return error(err.name, err.message);
  }
  return error("ServerError", "Something went wrong!");
};
