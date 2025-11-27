<script setup lang="ts">
import type { Review } from "~/types/entities";

interface Props {
  reviews: Review[];
}

interface ReviewFormData {
  name: string;
  email: string;
  rating: number;
  comment: string;
  saveData?: boolean;
}

const { reviews } = defineProps<Props>();

const handleReviewSubmit = (data: ReviewFormData) => {
  console.log("New review submitted:", data);
  // TODO: Send to API
  // await $fetch('/api/reviews', { method: 'POST', body: data })
};
</script>

<template>
  <div class="product-reviews">
    <h3 class="reviews-title">Відгуки ({{ reviews.length }})</h3>

    <div class="reviews-list">
      <div v-for="review in reviews" :key="review.id" class="review-item">
        <div class="review-header">
          <div class="review-author">{{ review.name }}</div>
          <div class="review-date">{{ review.createdAt }}</div>
        </div>
        <UiStarRating :rating="review.rating" size="20px" />
        <p class="review-text">{{ review.text }}</p>
      </div>
    </div>

    <ProductReviewForm @submit="handleReviewSubmit" />
  </div>
</template>

<style scoped>
.product-reviews {
  max-width: 800px;
}

.reviews-title {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 24px;
}

.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 40px;
}

.review-item {
  padding-bottom: 24px;
  border-bottom: 1px solid var(--color-gray);
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.review-author {
  font-weight: 500;
  color: var(--color-black);
}

.review-date {
  font-size: 14px;
  color: var(--color-dark-gray);
}

.review-text {
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-dark-gray);
  margin-top: 12px;
}
</style>
