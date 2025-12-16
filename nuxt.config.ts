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
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
    "@nuxtjs/tailwindcss",
  ],
  //css: ["~/assets/styles/main.css"],
  components: [{ path: "~/components", pathPrefix: true }],
  runtimeConfig: {
    // The private keys which are only available server-side
    token: "",
    api_url: "",
    // Keys within public are also exposed client-side
    public: {
      api_base: "",
      api_url: "",
      image_url: "",
    },
  },
  icon: {
    mode: "css",
    cssLayer: "base",
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
      tailwindcss: {},
      autoprefixer: {},
      "postcss-nested": {},
    },
  },
  app: {
    head: {
      title: "Anton Komarnytskyi Portfolio",
      titleTemplate: "%s | Nuxt Shop",
      htmlAttrs: { lang: "en" },
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
        { rel: "icon", type: "image/png", href: "/favicon.ico" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/icons/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "144x144",
          href: "/icons/favicon-144x144.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "192x192",
          href: "/icons/favicon-192x192.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "48x48",
          href: "/icons/favicon-48x48.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "72x72",
          href: "/icons/favicon-72x72.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "96x96",
          href: "/icons/favicon-96x96.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "256x256",
          href: "/icons/favicon-256x256.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "384x384",
          href: "/icons/favicon-384x384.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "512x512",
          href: "/icons/favicon-512x512.png",
        },
        {
          rel: "manifest",
          href: "/manifest.webmanifest",
          crossorigin: "anonymous",
        },
      ],
      script: [],
    },
    //pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
  sitemap: {
    sources: ["~/server/api/sitemap/url.ts"],
    defaults: {
      lastmod: new Date().toISOString(),
      priority: 0.5,
      changefreq: "weekly",
    },
  },
  robots: {
    //userAgent: "*",
    allow: "/",
    disallow: ["/admin", "/auth", "/account"],
    sitemap: "/sitemap.xml",
  },
  // routeRules: {
  //   "/about": { prerender: true },
  //   "/": { swr: true },
  //   "/catalog/**": { swr: 3600, sitemap: [ changefreq: "weekly", priority: 0.5 ], robots: false },
  //   //"/auth/**": { isr: true },
  // },
  nitro: {
    experimental: {
      database: true,
    },
    storage: {
      db: { driver: "redis" },
    },
    devStorage: {
      db: { driver: "fs-lite", base: "./db" },
    },
  },
  experimental: {
    componentIslands: true,
    payloadExtraction: true,
  },
});
