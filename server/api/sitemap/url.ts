import type { SitemapUrlInput } from "@nuxtjs/sitemap";

export default defineSitemapEventHandler(async (event) => {
  console.log("🚀 ~ event:", event);
  const products = await $fetch<GetProductsResponse>(`/api/products`, {
    query: { limit: 1000, offset: 0 },
  });

  return products.products.map((product) => ({
    loc: `/catalog/${product.id}`,
    lastmod: new Date().toISOString(),
    changefreq: "daily",
    priority: 0.5,
  })) satisfies SitemapUrlInput[];
});
