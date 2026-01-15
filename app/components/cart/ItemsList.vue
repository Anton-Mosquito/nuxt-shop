<script setup lang="ts">
const { items } = useCart();
</script>

<template>
  <div class="flex-1 space-y-4 mb-2">
    <div
      class="hidden md:grid grid-cols-12 gap-4 border-b border-gray-200 pb-2 mb-4 text-xs font-semibold text-gray-500 uppercase tracking-wider"
    >
      <div class="col-span-6">Product</div>
      <div class="col-span-3 text-center">Quantity</div>
      <div class="col-span-3 text-right">Total</div>
    </div>

    <TransitionGroup
      name="list"
      tag="div"
      class="space-y-4"
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-300 ease-in"
      enter-from-class="opacity-0 translate-x-8"
      enter-to-class="opacity-100 translate-x-0"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 -translate-x-8"
      move-class="transition-all duration-300"
    >
      <CartItem v-for="item in items" :key="item.id" :item="item" />
    </TransitionGroup>
  </div>
</template>
