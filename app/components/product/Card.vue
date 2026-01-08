<script setup lang="ts">
import type { Product } from "~/types";

const props = defineProps<{
  product: Product;
}>();

const isHovered = ref(false);
const discount = computed(() => props.product.discountPercentage ?? 0);
</script>

<template>
  <NuxtLink
    class="relative flex flex-col gap-6 w-full no-underline"
    :to="`/catalog/${props.product.id}`"
    prefetch-on="interaction"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div
      class="relative aspect-square rounded-lg w-full max-w-full overflow-hidden flex justify-between items-start p4"
    >
      <NuxtImg
        :src="useImageUrl(props.product.images?.[0])"
        :alt="props.product.title"
        provider="ipx"
        format="webp"
        quality="80"
        width="600"
        height="600"
        sizes="sm:100vw md:50vw lg:33vw"
        loading="lazy"
        class="absolute inset-0 w-full h-full object-cover z-1"
      />
      <span
        v-if="discount > 0"
        class="absolute top-3 left-3 py-1 px-2.5 rounded-md text-xs bg-[var(--color-accent)] text-[var(--color-white-light)] z-20 transition-[opacity,transform] duration-100"
        >- {{ discount }}%</span
      >
      <ProductAddFavorite :id="props.product.id" :is-shown="isHovered" />
    </div>
    <div class="flex flex-col gap-4">
      <div class="text-xl font-semibold text-[var(--color-accent)]">
        {{ props.product.title }}
      </div>
      <div class="text-xl font-medium capitalize text-[var(--color-accent)]">
        {{ props.product.price }} $
      </div>
    </div>
  </NuxtLink>
</template>
