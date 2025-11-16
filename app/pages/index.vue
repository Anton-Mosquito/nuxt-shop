<script setup lang="ts">
import type { IGetProductsResponse } from "~/interfaces/product.interface";

useSeoMeta({
  title: "Home - Nuxt Shop",
  description: "Welcome to Nuxt Shop - your destination for quality jewelry.",
  ogDescription: "Welcome to Nuxt Shop - your destination for quality jewelry.",
});

const productStore = useProductStore();
const API_URL = useAPI();

const { data } = await useFetch<IGetProductsResponse>(`${API_URL}/products`, {
  query: { limit: 6 },
});

if (data.value?.products) {
  productStore.setProducts(data.value.products);
}

const hasProducts = computed(() => productStore.products.length);
</script>

<template>
  <div class="home">
    <ProductSlider v-if="hasProducts" />

    <section class="home__section">
      <div class="home__header">
        <h2 class="home__title">Recent Arrivals</h2>
        <NuxtLink to="/catalog" class="home__link">All products</NuxtLink>
      </div>
      <ProductGrid v-if="hasProducts" :columns="3" />
    </section>
  </div>
</template>

<style scoped>
.home {
  max-width: 1248px;
  margin: 0 auto;
  padding: 0 16px 80px;
}

.home__section {
  margin-top: 80px;
}

.home__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 48px;
}

.home__title {
  font-size: 32px;
  font-weight: 400;
  color: var(--color-black);
}

.home__link {
  color: var(--color-accent);
  text-decoration: none;
  font-size: 16px;
  transition: color 0.2s;
}

.home__link:hover {
  color: var(--color-accent-dark);
}

@media (max-width: 768px) {
  .home__title {
    font-size: 24px;
  }

  .home__section {
    margin-top: 48px;
  }
}
</style>
