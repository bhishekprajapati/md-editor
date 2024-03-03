export default function useAuth() {
  const config = useAppConfig();

  async function signout() {
    try {
      await $fetch("/api/auth/signout", {
        method: "POST",
      });
      navigateTo(config.auth.pages.signoutRedirect);
    } catch (err) {
      console.log(err);
    }
  }

  return {
    signout,
  };
}
