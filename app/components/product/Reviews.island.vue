<script setup lang="ts">
import type { Product, Review } from "~/types/entities";

interface Props {
  reviews: Review[];
  productId: number;
}

const { reviews, productId } = defineProps<Props>();
const API_URL = useAPI();

const { data, pending } = await useLazyFetch<{
  product: Product;
  reviews: Review[];
}>(`${API_URL}/products/${productId}/reviews`);

const localReview = ref(data.value?.reviews || reviews || []);
const localReviews = computed(() => localReview.value);
const localReviewCount = computed(() => localReviews.value.length);

//const reviewCount = computed(() => reviews?.length || 0);
</script>

<template>
  <div class="max-w-3xl">
    <h3 class="text-xl font-medium mb-6">Reviews ({{ localReviewCount }})</h3>

    <SkeletonReview v-if="pending" :count="3" />

    <div v-else class="flex flex-col gap-6 mb-10">
      <div
        v-for="review in localReviews"
        :key="review.id"
        class="pb-6 border-b border-solid border-[var(--color-gray)]"
      >
        <div class="flex gap-3">
          <UserAvatar
            :src="review.avatar"
            :alt="review.name"
            size="sm"
            class="flex-shrink-0"
          />
          <div class="flex-1">
            <div class="flex justify-between items-center mb-2">
              <div class="font-medium text-[var(--color-black)]">
                {{ review.name }}
              </div>
              <NuxtTime
                :datetime="review.createdAt"
                class="text-sm"
                year="numeric"
                month="long"
                day="numeric"
                hour="2-digit"
                minute="2-digit"
              />
            </div>
            <UiStarRating :rating="review.rating" size="20px" />
            <p class="text-sm leading-[1.6] mt-3 text-[var(--color-dark-gray)]">
              {{ review.text }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <ProductReviewForm />
  </div>
</template>
