import type { DataResponse, Meta } from "~/server/types";

export const dataResponse = <T>(data: T, meta: Meta = {}): DataResponse<T> => ({
  results: data,
  meta,
});
