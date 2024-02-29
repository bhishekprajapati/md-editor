import type { User } from "lucia";

export default async function useUser(): Promise<User | null | undefined> {
  const { $api } = useNuxtApp();

  if (process.client) {
    return await $api.user.me.query();
  }

  if (process.server) {
    return await $fetch<User>("/api/auth/me");
  }
}
