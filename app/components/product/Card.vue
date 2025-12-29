<script setup lang="ts">
import type { Product } from "~/types";

const { id, discount, images, name, price } = defineProps<Product>();
const isHovered = ref(false);
</script>

<template>
  <NuxtLink
    class="relative flex flex-col gap-6 w-full no-underline"
    :to="`/catalog/${id}`"
    prefetch-on="interaction"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="relative aspect-square rounded-lg w-full max-w-full overflow-hidden flex justify-between items-start p4">
      <NuxtImg
        :src="useImageUrl(images?.[0])"
        :alt="name"
        provider="ipx"
        format="webp"
        quality="80"
        width="600"
        height="600"
        sizes="sm:100vw md:50vw lg:33vw"
        loading="lazy"
        class="absolute inset-0 w-full h-full object-cover z-1"
      />
      <span v-if="discount > 0" class="absolute top-3 left-3 py-1 px-2.5 rounded-md text-xs bg-[var(--color-accent)] text-[var(--color-white-light)] z-20 transition-[opacity,transform] duration-100">- {{ discount }}%</span>
      <AddFavorite :id="id" :is-shown="isHovered" />
    </div>
    <div class="flex flex-col gap-4">
      <div class="text-xl font-semibold text-[var(--color-accent)]">
        {{ name }}
      </div>
      <div class="text-xl font-medium capitalize text-[var(--color-accent)]">{{ price }} $</div>
    </div>
  </NuxtLink>
</template>