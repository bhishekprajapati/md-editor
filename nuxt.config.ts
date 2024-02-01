// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/google-fonts", "@nuxt/ui"],
  googleFonts: {
    families: {
      Roboto: [300, 400],
      "Roboto Slab": [300, 700],
      "Roboto Mono": true,
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  appConfig: {
    ui: {
      primary: "green",
      gray: "cool",
    },
  },
});
