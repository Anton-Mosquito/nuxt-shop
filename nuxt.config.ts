// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  components: [
    "~/components",
    {
      path: "~/widgets",
    },
  ],
  runtimeConfig: {
    // The private keys which are only available server-side
    token: "",
    api_url: "",
    // Keys within public are also exposed client-side
    public: {
      api_base: "",
    },
  },
  sourcemap: true,

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
  ],
  //css: ["~/assets/styles/main.css"],
});
