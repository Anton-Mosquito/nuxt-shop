// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@nuxt/icon",
  ],
  //css: ["~/assets/styles/main.css"],
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
  icon: {
    customCollections: [
      {
        prefix: "icon",
        dir: "./app/assets/icons",
        recursive: true,
      },
    ],
  },
});
