<script setup lang="ts">
import { ROUTES } from "~/constants";
useSeoMeta({
  title: "Cart page - Nuxt Shop",
});

const { items, fetchCart, loading, cart } = useCart();
await callOnce("cart", () => fetchCart(), { mode: "navigation" });
</script>

<template>
  <div class="container mx-auto px-8 max-w-7xl">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Your cart</h1>
      <NuxtLink
        :to="ROUTES.CATALOG"
        class="text-gray-600 hover:text-black underline-offset-4 hover:underline"
      >
        Continue shopping
      </NuxtLink>
    </div>

    <SkeletonCart v-if="loading" />

    <div
      v-else-if="!loading && cart && items.length === 0"
      class="text-center py-12"
    >
      <p class="text-gray-500 text-lg mb-4">Your cart is empty.</p>
      <NuxtLink :to="ROUTES.CATALOG">
        <UiButton>Start Shopping</UiButton>
      </NuxtLink>
    </div>

    <div v-else class="flex flex-col lg:flex-row gap-8">
      <CartItemsList />
      <CartOrderSummary />
    </div>
  </div>
</template>
