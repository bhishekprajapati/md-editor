export default async function useUser() {
  if (process.client) {
    return useSupabaseUser();
  }

  if (process.server) {
    try {
      const user = await $fetch("/api/me", {
        headers: useRequestHeaders(["cookie"]),
      });
      return user;
    } catch (err) {
      return null;
    }
  }
}
