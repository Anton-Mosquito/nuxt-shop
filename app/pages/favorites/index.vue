<script setup lang="ts">
import { MESSAGES, API_ENDPOINTS } from "~/constants";
useSeoMeta({
  title: "Favorites - Nuxt Shop",
  description: "Browse your favorite products at Nuxt Shop.",
  ogDescription: "Browse your favorite products at Nuxt Shop.",
});

const { favoriteIds, fetchFavorites } = useWishlist();
const { showLoader, hideLoader } = usePageLoader();
const products = shallowRef<Product[]>([]);

await callOnce("fetchFavorites", () => fetchFavorites());

watch(
  favoriteIds,
  async (ids) => {
    if (!ids.length) {
      products.value = [];
      hideLoader();
      return;
    }

    showLoader(MESSAGES.LOADING_FAVORITES);
    try {
      const { products: fetchedProducts } = await $fetch<GetProductsResponse>(
        `${API_ENDPOINTS.PRODUCTS}/batch`,
        {
          params: {
            ids,
          },
        }
      );
      products.value = fetchedProducts;
    } catch (e) {
      console.error(e);
    } finally {
      hideLoader();
    }
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold mb-6">Favorites</h1>

    <div
      v-if="favoriteIds.length === 0"
      class="py-12 text-center text-gray-600"
    >
      <p class="text-lg">You haven't added any favorites yet.</p>
      <p class="text-sm mt-2">
        Browse the catalog and add products to your favorites.
      </p>
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-3 max-w-full [&>*]:w-full [&>*]:max-w-full"
    >
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>
