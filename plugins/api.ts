import type { $Fetch, NitroFetchOptions } from "nitropack";
import type { DataResponse, ErrorResponse } from "~/server/api/types";

type ServerResponse<D = any> = DataResponse<D> | ErrorResponse;

interface Repository<GET, GETALL, POST, PATCH, DELETE> {
  get: (
    id: string,
    opts?: NitroFetchOptions<any, "get">,
  ) => Promise<ServerResponse<GET>>;
  getAll: (
    opts?: NitroFetchOptions<any, "get">,
  ) => Promise<ServerResponse<GETALL>>;
  post: (
    payload: any,
    opts?: NitroFetchOptions<any, "post">,
  ) => Promise<ServerResponse<POST>>;
  patch: (
    id: string,
    payload: any,
    opts?: NitroFetchOptions<any, "patch">,
  ) => Promise<ServerResponse<PATCH>>;
  delete: (
    id: string,
    opts?: NitroFetchOptions<any, "delete">,
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
