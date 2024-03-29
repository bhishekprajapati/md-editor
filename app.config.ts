export default defineAppConfig({
  ui: {
    primary: "orange",
    gray: "cool",
    card: {
      background: "bg-gray-100 dark:bg-slate-800",
      shadow: "hover:shadow-lg dark:shadow-gray-900 transition-shadow",
    },
    avatar: {
      background: "bg-white",
    },
  },
  auth: {
    pages: {
      signin: "/auth/signin",
      signinRedirect: "/", // redirecting authenticated user
      signoutRedirect: "/auth/signin", // redirecting after signout
    },
  },
});
