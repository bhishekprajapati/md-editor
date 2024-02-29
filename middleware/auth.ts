export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = await useUser();

  if (!user && !from.path.includes("/login")) {
    return navigateTo("/auth/signin");
  }
});
