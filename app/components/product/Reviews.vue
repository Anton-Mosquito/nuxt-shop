<script setup lang="ts">
interface Review {
  id: number;
  author: string;
  date: string;
  rating: number;
  text: string;
}

const reviews = ref<Review[]>([
  {
    id: 1,
    author: "Василий",
    date: "8 мая 2024",
    rating: 3,
    text: "Я очень доволен, как мне сели эти серьги, и мне нравится, желе держать новый телефон, который был прислан.",
  },
  {
    id: 2,
    author: "Николай",
    date: "8 мая 2024",
    rating: 3,
    text: "Ви поставлять в больше, что при доставку данных серёги помешаю в среди популярних, а во изкупил! В остальном серьзи, отлитчим и ваш підприємств!",
  },
]);

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

const setRating = (rating: number) => {
  newReview.value.rating = rating;
};
</script>

<template>
  <div class="product-reviews">
    <h3 class="reviews-title">Отзывы ({{ reviews.length }})</h3>

    <div class="reviews-list">
      <div v-for="review in reviews" :key="review.id" class="review-item">
        <div class="review-header">
          <div class="review-author">{{ review.author }}</div>
          <div class="review-date">{{ review.date }}</div>
        </div>
        <div class="review-rating">
          <span
            v-for="i in 5"
            :key="i"
            class="star"
            :class="{ filled: i <= review.rating }"
            >★</span
          >
        </div>
        <p class="review-text">{{ review.text }}</p>
      </div>
    </div>

    <div class="review-form">
      <h3 class="form-title">Добавить отзыв</h3>
      <p class="form-description">
        Ваш email не будет опубликован. Обязательные поля помечены *
      </p>

      <form @submit.prevent="submitReview">
        <div class="form-group">
          <label>Рейтинг*</label>
          <div class="rating-input">
            <button
              v-for="i in 5"
              :key="i"
              type="button"
              class="star-btn"
              :class="{ active: i <= newReview.rating }"
              @click="setRating(i)"
            >
              ★
            </button>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Ваше имя*</label>
            <input
              v-model="newReview.name"
              type="text"
              required
              placeholder="Введите ваше имя"
            />
          </div>

          <div class="form-group">
            <label>Ваш email*</label>
            <input
              v-model="newReview.email"
              type="email"
              required
              placeholder="Введите ваш email"
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

.review-rating {
  display: flex;
  gap: 4px;
  margin-bottom: 12px;
}

.star {
  font-size: 16px;
  color: var(--color-gray);
}

.star.filled {
  color: var(--color-black);
}

.review-text {
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-dark-gray);
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

.rating-input {
  display: flex;
  gap: 8px;
}

.star-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--color-gray);
  padding: 0;
  transition: color 0.2s;
}

.star-btn:hover,
.star-btn.active {
  color: var(--color-black);
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
