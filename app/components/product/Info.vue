<script setup lang="ts">
import type { IProduct } from "~/interfaces/product.interface";
import type { IReview } from "~/interfaces/review.interface";
import { SHARE_BUTTONS } from "~/constants";

interface Props {
  product: IProduct;
  reviews: IReview[];
}

const { product, reviews } = defineProps<Props>();
const quantity = ref(1);

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

const averageRating = computed(() => {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.length;
});
</script>

<template>
  <div class="product-info">
    <h1 class="product-title">{{ product.name }}</h1>
    <div class="product-price">$ {{ product.price }}</div>

    <div class="product-rating">
      <UiStarRating :rating="averageRating" />
      <span class="review-count">{{ reviewCount }} {{ reviewWord }}</span>
    </div>

    <p class="product-description">{{ product.short_description }}</p>

    <div class="product-actions">
      <UiQuantityInput v-model="quantity" :min="1" :max="99" />

      <UiButton class="add-to-cart" variant="outline" @click="addToCart"
        >Add to Cart</UiButton
      >
    </div>

    <div class="product-icons">
      <AddFavorite :id="product.id" variant="inline" is-shown />
      <div class="product-icons__separator"></div>
      <button
        v-for="{ platform, icon, label } in SHARE_BUTTONS"
        :key="platform"
        class="icon-btn"
        :aria-label="`Share on ${label}`"
        @click="shareProduct(platform)"
      >
        <Icon :name="icon" size="20" />
      </button>
    </div>

    <div class="product-meta">
      <div class="meta-item">
        <span class="meta-label">SKU: </span>
        <span class="meta-value">{{ product.sku }}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Category:</span>
        <span class="meta-value">{{ product.category.name }}</span>
      </div>
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

.add-to-cart {
  /* Make the primary action visually consistent:
     - take remaining horizontal space in the actions row
     - fixed height to match design mock
     - center content and remove extra vertical padding from the button internals
     - slightly larger radius for modern look */
  flex: 1;
  height: 48px;
  padding: 0 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: 700;
  /* ensure the button's own padding doesn't add extra height */
  line-height: 1;
}

.product-icons {
  position: relative;
  display: flex;
  gap: 16px;
  margin-top: 8px;
  align-items: center;
}

.product-icons__separator {
  width: 1px;
  height: 24px;
  background: var(--color-gray);
  margin: 0 4px;
}

.icon-btn {
  width: 40px;
  height: 40px;
  border: none;
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
