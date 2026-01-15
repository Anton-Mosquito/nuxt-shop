<script setup lang="ts">
import type { Review } from "~~/shared/types";

interface Props {
  reviews: Review[];
}

const { reviews } = defineProps<Props>();
</script>

<template>
  <div class="max-w-3xl">
    <h3 class="text-xl font-medium mb-6">Reviews ({{ reviews.length }})</h3>

    <SkeletonReview v-if="false" :count="3" />

    <div v-else class="flex flex-col gap-6 mb-10">
      <div
        v-for="review in reviews"
        :key="review.id"
        class="pb-6 border-b border-solid border-[var(--color-gray)]"
      >
        <div class="flex gap-3">
          <UiAvatar
            :src="review.avatar"
            :alt="review.reviewerName"
            size="sm"
            class="flex-shrink-0"
          />
          <div class="flex-1">
            <div class="flex justify-between items-center mb-2">
              <div class="font-medium text-[var(--color-black)]">
                {{ review.reviewerName }}
              </div>
              <NuxtTime
                v-if="review.createdAt"
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
              {{ review.comment }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <ProductReviewForm />
  </div>
</template>
