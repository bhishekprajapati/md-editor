export type PaginationMeta = {
  page: number;
  pageSize: number;
  totalPages: number;
};

export type Meta = {
  pagination?: PaginationMeta;
};

export interface DataResponse<D> {
  data: D;
  meta?: Meta;
  error: null;
}

export const dataResponse = <T>(data: T, meta: Meta = {}): DataResponse<T> => ({
  data,
  meta,
  error: null,
});
