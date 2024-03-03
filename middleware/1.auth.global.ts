import { StatusCodes } from "http-status-codes";

export default defineNuxtRouteMiddleware(async (to) => {
  const { userId } = to.params;
  const { user } = await useUser();
  const config = useAppConfig();
  const isAuthenticated = !!user.data.value;

  if (isAuthenticated && to.path === config.auth.pages.signin) {
    return navigateTo(config.auth.pages.signinRedirect);
  }

  /**
   * allow navigation to public paths
   */
  if (!userId) {
    return true;
  }

  /**
   * redirect for protected routes
   */
  if (!isAuthenticated) {
    return navigateTo(config.auth.pages.signin);
  }

  /** If userId mismatch */
  if (user.data.value?.id !== userId) {
    throw createError({
      statusCode: StatusCodes.FORBIDDEN,
    });
  }
});
