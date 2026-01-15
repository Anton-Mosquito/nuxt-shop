<script setup lang="ts">
import type { Product, Review } from "~/types/entities";
import { SHARE_BUTTONS } from "~/constants";

interface Props {
  product: Product;
  reviews: Review[];
  reviewCount?: number;
}

const { product, reviews, reviewCount = 0 } = defineProps<Props>();
const quantity = ref(1);

const addToCart = () => {
  console.log("Add to cart:", product.id, quantity.value);
};

const shareProduct = (platform: string) => {
  console.log("Share on:", platform);
};

const reviewWord = computed(() => (reviewCount === 1 ? "review" : "reviews"));

const averageRating = computed(() => {
  if (reviews.length === 0) return 0;

  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.length;
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <h1
      class="text-2xl md:text-[26px] font-normal text-[var(--color-black)] m-0"
    >
      {{ product.name }}
    </h1>

    <div class="text-lg font-semibold text-[var(--color-accent)]">
      $ {{ product.price }}
    </div>

    <div class="flex items-center gap-3">
      <UiStarRating :rating="averageRating" />
      <span class="text-sm text-[var(--color-dark-gray)]"
        >{{ reviewCount }} {{ reviewWord }}</span
      >
    </div>

    <p class="text-sm leading-6 text-[var(--color-dark-gray)] my-2">
      {{ product.short_description }}
    </p>

    <div class="flex flex-col gap-4 md:flex-row md:items-center mt-2">
      <UiQuantityInput v-model="quantity" :min="1" :max="99" />

      <UiButton
        class="flex-1 h-12 px-6 inline-flex items-center justify-center rounded-lg font-bold"
        variant="outline"
        @click="addToCart"
      >
        Add to Cart
      </UiButton>
    </div>

    <div class="flex items-center gap-4 mt-2">
      <ProductAddFavorite :id="product.id" variant="inline" is-shown />
      <div class="w-px h-6 bg-[var(--color-gray)] mx-1" />

      <div class="flex items-center gap-2">
        <button
          v-for="{ platform, icon, label } in SHARE_BUTTONS"
          :key="platform"
          class="w-10 h-10 inline-flex items-center justify-center bg-transparent border-0 text-[var(--color-dark-gray)] hover:text-[var(--color-accent)]"
          :aria-label="`Share on ${label}`"
          @click="shareProduct(platform)"
        >
          <Icon :name="icon" size="20" />
        </button>
      </div>
    </div>

    <div
      class="flex flex-col gap-2 py-4 border-t border-b border-[var(--color-gray)]"
    >
      <div class="flex gap-2 text-sm">
        <span class="text-[var(--color-dark-gray)]">SKU:</span>
        <span class="text-[var(--color-black)]">{{ product.sku }}</span>
      </div>
      <div class="flex gap-2 text-sm">
        <span class="text-[var(--color-dark-gray)]">Category:</span>
        <span class="text-[var(--color-black)]">{{
          product.category.name
        }}</span>
      </div>
    </div>
  </div>
</template>
