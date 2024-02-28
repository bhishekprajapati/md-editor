import type { serverSupabaseUser } from "#supabase/server";

export type User = Awaited<ReturnType<typeof serverSupabaseUser>>;
export type AuthenticatedUser = NonNullable<User>;
