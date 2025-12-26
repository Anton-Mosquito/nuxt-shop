<!-- pages/products/index.vue -->
<script setup lang="ts">
const { data: products, pending } = await useLazyFetch("/api/products");
</script>

<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">Продукти</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <!-- Показуємо skeleton під час завантаження -->
      <template v-if="pending">
        <SkeletonCard v-for="i in 8" :key="i" />
      </template>

      <!-- Реальні дані -->
      <template v-else>
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </template>
    </div>
  </div>
</template>
