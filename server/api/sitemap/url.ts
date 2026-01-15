import type { IGetProductsResponse } from "~/interfaces/product.interface";
import type { SitemapUrlInput } from "@nuxtjs/sitemap";
import { useAPI } from "~/composables/useAPI";

export default defineSitemapEventHandler(async (event) => {
  console.log("🚀 ~ event:", event);
  const API_URL = useAPI();

  const products = await $fetch<IGetProductsResponse>(`${API_URL}/products`, {
    query: { limit: 1000, offset: 0 },
  });

  const pages = products.products.map(({ id }) => ({
    loc: `/catalog/${id}`,
    lastmod: new Date().toISOString(),
    changefreq: "daily",
    priority: 0.5,
  })) satisfies SitemapUrlInput[];

  return pages;
});
