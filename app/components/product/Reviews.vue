<script setup lang="ts">
import type { IReview } from "~/interfaces/review.interface";

interface Props {
  reviews: IReview[];
}

const { reviews } = defineProps<Props>();
console.log("🚀 ~ reviews:", reviews);

const newReview = ref({
  name: "",
  email: "",
  rating: 0,
  comment: "",
  saveData: false,
});

const submitReview = () => {
  console.log("Submit review:", newReview.value);
  // Reset form
  newReview.value = {
    name: "",
    email: "",
    rating: 0,
    comment: "",
    saveData: false,
  };
};
</script>

<template>
  <div class="product-reviews">
    <h3 class="reviews-title">Feedback ({{ reviews.length }})</h3>

    <div class="reviews-list">
      <div v-for="review in reviews" :key="review.id" class="review-item">
        <div class="review-header">
          <div class="review-author">{{ review.name }}</div>
          <div class="review-date">{{ review.created_at }}</div>
        </div>
        <UiStarRating :rating="review.rating" size="20px" />
        <p class="review-text">{{ review.text }}</p>
      </div>
    </div>

    <div class="review-form">
      <h3 class="form-title">Add Review</h3>
      <p class="form-description">
        Your email will not be published. Required fields are marked *
      </p>

      <form @submit.prevent="submitReview">
        <div class="form-group">
          <label>Rating*</label>
          <UiStarRating v-model="newReview.rating" interactive size="32px" />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Your name*</label>
            <input
              v-model="newReview.name"
              type="text"
              required
              placeholder="Enter your name"
            />
          </div>

          <div class="form-group">
            <label>Your email*</label>
            <input
              v-model="newReview.email"
              type="email"
              required
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div class="form-group">
          <label>Ваш отзыв*</label>
          <textarea
            v-model="newReview.comment"
            required
            rows="5"
            placeholder="Введите ваш отзыв"
          ></textarea>
        </div>

        <div class="form-group checkbox-group">
          <label class="checkbox-label">
            <input v-model="newReview.saveData" type="checkbox" />
            Сохранить данные для следующих отзывов
          </label>
        </div>

        <UiButton type="submit">Отправить</UiButton>
      </form>
    </div>
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

.review-form {
  margin-top: 40px;
}

.form-title {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 8px;
}

.form-description {
  font-size: 14px;
  color: var(--color-dark-gray);
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
  color: var(--color-black);
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--color-gray);
  font-size: 14px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: var(--color-accent);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.checkbox-group {
  margin-bottom: 24px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: auto;
  cursor: pointer;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
