<script setup lang="ts">
import type { Product } from "~~/shared/types";

interface Props {
  products: Product[];
  isLoading?: boolean;
}

const { products, isLoading = false } = defineProps<Props>();
</script>

<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-3 max-w-full [&>*]:w-full [&>*]:max-w-full"
  >
    <template v-if="isLoading">
      <SkeletonCard v-for="n in 6" :key="n" />
    </template>

    <template v-else>
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </template>
  </div>
</template>
