import type { User } from "lucia";

export default async function useUser() {
  const query = await useFetch<User | null>("/api/auth/me");
  return {
    user: query,
    query,
  };
}
