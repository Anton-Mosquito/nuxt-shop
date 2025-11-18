<script setup lang="ts">
import type { IProduct } from "~/interfaces/product.interface";
import type { IReview } from "~/interfaces/review.interface";

interface Props {
  product: IProduct;
  reviews: IReview[];
}

const { product, reviews } = defineProps<Props>();
const quantity = ref(1);
const isFavorite = ref(false);

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const increaseQuantity = () => {
  quantity.value++;
};

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
};

const addToCart = () => {
  console.log("Add to cart:", product.id, quantity.value);
};

const shareProduct = (platform: string) => {
  console.log("Share on:", platform);
};
const reviewCount = computed(() => reviews.length);
const reviewWord = computed(() => {
  const count = reviewCount.value;
  return count === 1 ? "review" : "reviews";
});
</script>

<template>
  <div class="product-info">
    <h1 class="product-title">{{ product.name }}</h1>
    <div class="product-price">$ {{ product.price }}</div>

    <div class="product-rating">
      <div class="stars">
        <span v-for="i in 5" :key="i" class="star">★</span>
      </div>
      <span class="review-count">{{ reviewCount }} {{ reviewWord }}</span>
    </div>

    <p class="product-description">{{ product.short_description }}</p>

    <div class="product-meta">
      <div class="meta-item">
        <span class="meta-label">SKU:</span>
        <span class="meta-value">{{ product.id }}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Категорія:</span>
        <span class="meta-value">Серьги</span>
      </div>
    </div>

    <div class="product-actions">
      <div class="quantity-selector">
        <button class="quantity-btn" @click="decreaseQuantity">-</button>
        <input v-model.number="quantity" type="number" min="1" readonly />
        <button class="quantity-btn" @click="increaseQuantity">+</button>
      </div>

      <ActionButton class="add-to-cart" @click="addToCart">
        Додати в корзину
      </ActionButton>
    </div>

    <div class="product-icons">
      <button
        class="icon-btn"
        :class="{ active: isFavorite }"
        @click="toggleFavorite"
      >
        <Icon name="icon:heart-outline" size="20" />
      </button>
      <button class="icon-btn" @click="shareProduct('email')">
        <Icon name="mdi:email-outline" size="20" />
      </button>
      <button class="icon-btn" @click="shareProduct('facebook')">
        <Icon name="mdi:facebook" size="20" />
      </button>
      <button class="icon-btn" @click="shareProduct('instagram')">
        <Icon name="mdi:instagram" size="20" />
      </button>
      <button class="icon-btn" @click="shareProduct('twitter')">
        <Icon name="mdi:twitter" size="20" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.product-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.product-title {
  font-size: 26px;
  font-weight: 400;
  color: var(--color-black);
  margin: 0;
}

.product-price {
  font-size: 20px;
  color: var(--color-accent);
  font-weight: 500;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stars {
  display: flex;
  gap: 4px;
  color: var(--color-black);
}

.star {
  font-size: 16px;
}

.review-count {
  font-size: 14px;
  color: var(--color-dark-gray);
}

.product-description {
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-dark-gray);
  margin: 8px 0;
}

.product-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 0;
  border-top: 1px solid var(--color-gray);
  border-bottom: 1px solid var(--color-gray);
}

.meta-item {
  display: flex;
  gap: 8px;
  font-size: 14px;
}

.meta-label {
  color: var(--color-dark-gray);
}

.meta-value {
  color: var(--color-black);
}

.product-actions {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-top: 8px;
}

.quantity-selector {
  display: flex;
  align-items: center;
  border: 1px solid var(--color-gray);
  width: 120px;
  height: 48px;
}

.quantity-btn {
  width: 40px;
  height: 100%;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 20px;
  color: var(--color-dark-gray);
  transition: color 0.2s;
}

.quantity-btn:hover {
  color: var(--color-black);
}

.quantity-selector input {
  flex: 1;
  border: none;
  text-align: center;
  font-size: 14px;
  outline: none;
}

.add-to-cart {
  flex: 1;
  height: 48px;
}

.product-icons {
  display: flex;
  gap: 16px;
  margin-top: 8px;
}

.icon-btn {
  width: 40px;
  height: 40px;
  border: 1px solid var(--color-gray);
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  color: var(--color-dark-gray);
}

.icon-btn:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.icon-btn.active {
  color: var(--color-accent);
  fill: var(--color-accent);
}

@media (max-width: 768px) {
  .product-title {
    font-size: 22px;
  }

  .product-actions {
    flex-direction: column;
  }

  .add-to-cart {
    width: 100%;
  }
}
</style>
