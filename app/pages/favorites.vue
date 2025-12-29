<script setup lang="ts">
import type { Product } from "~/types/entities";

useSeoMeta({
  title: "Favorites - Nuxt Shop",
  description: "Browse your favorite products at Nuxt Shop.",
  ogDescription: "Browse your favorite products at Nuxt Shop.",
});

const API_URL = useAPI();
const favoriteStore = useFavoriteStore();
const products = ref<Product[]>([]);
// await callOnce("fetchFavorites", () => favoriteStore.fetchFavorites(), {
//   mode: "navigation",
// });
watchEffect(async () => {
  const data = await Promise.all(
    favoriteStore.favoriteIds.map((id) =>
      $fetch<{ product: Product }>(`${API_URL}/products/${id}`)
    )
  );

  products.value = data.map(({ product }) => product);
});
</script>

<template>
  <div class="catalog__grid">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      v-bind="product"
    />
  </div>
</template>

<style scoped>
.catalog__grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 64px 12px;
}
</style>
