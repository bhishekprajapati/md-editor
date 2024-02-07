export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = await useUser();

  if (!user) {
    return navigateTo("/login");
  }
});
