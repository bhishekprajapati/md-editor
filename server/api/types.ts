export type PaginationMeta = {
  page: number;
  pageSize: number;
  totalPages: number;
};

export type Meta = {
  pagination?: PaginationMeta;
};

export interface ApiResponse<D> {
  data: D | null;
  error: string | null;
  meta?: Meta;
  message?: string;
}

export interface DataResponse<D> extends ApiResponse<D> {
  data: D;
  error: null;
}

export interface ErrorResponse extends ApiResponse<null> {
  data: null;
  error: string;
}
