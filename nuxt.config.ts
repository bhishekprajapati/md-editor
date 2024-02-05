// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/supabase",
    "@nuxtjs/google-fonts",
    "@nuxt/ui",
    "@pinia/nuxt",
  ],
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
  supabase: {
    redirect: false,
  },
});
