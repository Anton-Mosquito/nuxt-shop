import type { GetProductsResponse } from "~/types";
import type { SitemapUrlInput } from "@nuxtjs/sitemap";
import { useAPI } from "~/composables/useAPI";

export default defineSitemapEventHandler(async (event) => {
  console.log("🚀 ~ event:", event);
  const API_URL = useAPI();

  const products = await $fetch<GetProductsResponse>(`${API_URL}/products`, {
    query: { limit: 1000, offset: 0 },
  });

  const pages = products.products.map((product) => ({
    loc: `/catalog/${product.id}`,
    lastmod: new Date().toISOString(),
    changefreq: "daily",
    priority: 0.5,
  })) satisfies SitemapUrlInput[];

  return pages;
});
