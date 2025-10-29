import type { RouterConfig } from "@nuxt/schema";

export default {
  routes: (_routes) => [
    {
      name: "custom-home",
      path: "/home",
      component: () => import("~/pages/index.vue"),
    },
    {
      name: "custom-about",
      path: "/about",
      component: () => import("~/pages/about.vue"),
    },
  ],
} satisfies RouterConfig;
