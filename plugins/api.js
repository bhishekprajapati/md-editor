import { ref } from "vue";

async function handleApiCall(call) {
  try {
    return {
      error: null,
      resp: await call(),
    };
  } catch (err) {
    return {
      error: err,
      message: err?.message ?? err?.statusText ?? "Something went wrong!",
    };
  }
}

const createRepositoryClient = ($fetch) => (resourceName) => ({
  async get(id, fetchOptions = {}) {
    return await handleApiCall(
      async () =>
        await $fetch(`/${resourceName}/${id}`, {
          ...fetchOptions,
          method: "GET",
        }),
    );
  },

  async getAll(fetchOptions = {}) {
    return await handleApiCall(
      async () =>
        await $fetch(`/${resourceName}`, {
          ...fetchOptions,
          method: "GET",
        }),
    );
  },

  async post(payload, fetchOptions = {}) {
    return await handleApiCall(
      async () =>
        await $fetch(`/${resourceName}`, {
          ...fetchOptions,
          method: "POST",
          body: payload,
        }),
    );
  },

  async patch(id, payload, fetchOptions = {}) {
    return await handleApiCall(
      async () =>
        await $fetch(`/${resourceName}/${id}`, {
          ...fetchOptions,
          method: "PATCH",
          body: payload,
        }),
    );
  },

  async delete(id, fetchOptions) {
    return await handleApiCall(
      async () =>
        await $fetch(`/${resourceName}/${id}`, {
          ...fetchOptions,
          method: "DELETE",
        }),
    );
  },
});

export default defineNuxtPlugin((nuxtApp) => {
  const createRepository = createRepositoryClient($fetch);
  const modules = {
    files: createRepository("files"),
  };

  if (process.env.NODE_ENV === "development") {
    console.log("✨ Api repository plugin registered!");
  }
  return {
    provide: {
      api: modules,
      ref,
    },
  };
});
