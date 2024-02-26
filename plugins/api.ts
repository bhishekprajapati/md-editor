import type { $Fetch, NitroFetchOptions, NitroFetchRequest } from "nitropack";
import type { H3Error } from "h3";
import type { DataResponse } from "~/server/utils/api";

type ServerResponse<D = any> = DataResponse<D> | H3Error;
type Options<T extends "get" | "post" | "patch" | "delete"> = NitroFetchOptions<
  NitroFetchRequest,
  T
>;

interface Repository<GET, GETALL, POST, PATCH, DELETE> {
  get: (id: string, opts?: Options<"get">) => Promise<ServerResponse<GET>>;
  getAll: (opts?: Options<"get">) => Promise<ServerResponse<GETALL>>;
  post: (payload: any, opts?: Options<"post">) => Promise<ServerResponse<POST>>;
  patch: (
    id: string,
    payload: any,
    opts?: Options<"patch">,
  ) => Promise<ServerResponse<PATCH>>;
  delete: (
    id: string,
    opts?: Options<"delete">,
  ) => Promise<ServerResponse<DELETE>>;
}

function createRepositoryClient($fetch: $Fetch) {
  return <GET = any, GETALL = any, POST = any, PATCH = any, DELETE = any>(
    resourceName: string,
  ): Repository<GET, GETALL, POST, PATCH, DELETE> => {
    const getUri = (id?: string) =>
      id ? `/${resourceName}/${id}` : `/${resourceName}`;

    return {
      async get(id, opts) {
        return $fetch(getUri(id), {
          ...opts,
          method: "GET",
        });
      },

      async getAll(opts = {}) {
        return $fetch(getUri(), {
          ...opts,
          method: "GET",
        });
      },

      async post(payload, opts = {}) {
        return $fetch(getUri(), {
          ...opts,
          method: "POST",
          body: payload,
        });
      },

      async patch(id, payload, opts = {}) {
        return $fetch(getUri(id), {
          ...opts,
          method: "PATCH" as any, // fix type error
          body: payload,
        });
      },

      async delete(id, opts = {}) {
        return $fetch(getUri(id), {
          ...opts,
          method: "DELETE" as any, // fix type error
        });
      },
    };
  };
}

export default defineNuxtPlugin((nuxtApp) => {
  const createRepository = createRepositoryClient($fetch);
  const fileRepo = createRepository("files");

  const modules = {
    files: fileRepo,
  };

  if (process.env.NODE_ENV === "development") {
    console.log("✨ Api repository plugin registered!");
  }

  return {
    provide: {
      api: modules,
    },
  };
});
