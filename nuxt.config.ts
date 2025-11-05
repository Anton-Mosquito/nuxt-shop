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
  postcss: {
    plugins: {
      "postcss-nested": {},
    },
  },
  app: {
    head: {
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Nuxt Shop" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css",
        },
      ],
      script: [],
    },
    //pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
  // routeRules: {
  //   "/about": { prerender: true },
  //   "/": { swr: true },
  //   "/catalog/**": { swr: 3600 },
  //   //"/auth/**": { isr: true },
  // },
});
