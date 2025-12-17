<script setup lang="ts">
import type { IProduct } from "~/interfaces/product.interface";

const config = useRuntimeConfig();
const favoriteStore = useFavoriteStore();
const products = ref<IProduct[]>([]);
// await callOnce("fetchFavorites", () => favoriteStore.fetchFavorites(), {
//   mode: "navigation",
// });
watchEffect(async () => {
  const data = await Promise.all(
    favoriteStore.favoriteIds.map((id) =>
      $fetch<{ product: IProduct }>(`${config.public.api_url}/products/${id}`)
    )
  );

  products.value = data.map(({ product }) => product);
});
</script>

<template>
  <div class="catalog__grid">
    <CatalogCard
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
