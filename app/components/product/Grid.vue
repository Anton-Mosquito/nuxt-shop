<script setup lang="ts">
import type { IProduct } from "~/interfaces/product.interface";

interface Props {
  products: IProduct[];
  columns?: number;
}

const { columns = 3, products } = defineProps<Props>();
</script>

<template>
  <div class="product-grid">
    <CatalogCard
      v-for="product in products"
      :key="product.id"
      v-bind="product"
    />
  </div>
</template>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(v-bind(columns), minmax(min(100%, 300px), 1fr));
  gap: 64px 12px;
  max-width: 100%;
}

/* Prevent cards from stretching when fewer items than columns */
.product-grid > * {
  max-width: 100%;
  width: 100%;
}

@media (max-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}
</style>
