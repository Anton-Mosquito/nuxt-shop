<script setup lang="ts">
import { API_ENDPOINTS, ROUTES } from "~/constants";

useSeoMeta({
  title: "Home - Nuxt Shop",
  description: "Welcome to Nuxt Shop - your destination for quality jewelry.",
  ogDescription: "Welcome to Nuxt Shop - your destination for quality jewelry.",
});

const { data } = await useFetch<ProductsQueryResponse>(
  `${API_ENDPOINTS.PRODUCTS}`,
  {
    query: { limit: 6, offset: 0 },
  }
);
const { products, hasProducts } = useProducts();

function useProducts() {
  const products = computed(() => data.value?.products ?? []);
  const hasProducts = computed(() => products.value.length > 0);

  return {
    products,
    hasProducts,
  };
}
</script>

<template>
  <div class="max-w-[1248px] mx-auto px-4 pb-20">
    <ProductSlider v-if="hasProducts" :products="products" />

    <section class="mt-20">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-2xl font-normal text-[var(--color-black)] md:text-2xl">
          Recent Arrivals
        </h2>
        <NuxtLink
          :to="ROUTES.CATALOG"
          class="text-[var(--color-accent)] no-underline text-sm transition-colors hover:text-[var(--color-accent-dark)]"
          prefetch
          >All products</NuxtLink
        >
      </div>
      <ProductGrid v-if="hasProducts" :products="products" :columns="3" />
    </section>
  </div>
</template>
