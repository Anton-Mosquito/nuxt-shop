<script setup lang="ts">
import type { IProduct } from "~/interfaces/product.interface";
import type { IReview } from "~/interfaces/review.interface";

interface Props {
  product: IProduct;
  reviews: IReview[];
}

const route = useRoute();
const API_URL = useAPI();
const id = ref(route.params.id);

const { data } = await useFetch<Props>(`${API_URL}/products/${id.value}`);
console.log("🚀 ~ data:", data.value?.reviews);

useSeoMeta({
  title: data.value
    ? `${data.value.product.name} - Nuxt Shop`
    : "Product - Nuxt Shop",
  description: data.value
    ? data.value.product.short_description
    : "Browse our extensive catalog of products at Nuxt Shop.",
  ogDescription: data.value
    ? data.value.product.short_description
    : "Browse our extensive catalog of products at Nuxt Shop.",
});

const productImages = computed(() => {
  if (!data.value?.product.images || data.value.product.images.length === 0) {
    return ["/placeholder.jpg"];
  }
  return data.value.product.images;
});
</script>

<template>
  <div v-if="data?.product" class="product-page">
    <Head>
      <Title>{{ data.product.name }} - Nuxt Shop</Title>
      <Meta name="description" :content="data.product.short_description" />
    </Head>

    <div class="product-container">
      <ProductImageGallery
        :images="productImages"
        :alt="data.product.name"
        solid
      />
      <ProductInfo :product="data.product" :reviews="data.reviews" />
    </div>

    <ProductTabs>
      <template #description>
        <div class="description-content">
          <p>
            {{
              data.product.long_description || data.product.short_description
            }}
          </p>
          <p>
            Отлично подходит к любому гардеробу. Частое золото высокого качества
            прослужит долго и не потемнеет. Отлично подойдет в качестве подарка
            близкому человеку.
          </p>
        </div>
      </template>
      <template #reviews>
        <ProductReviews />
      </template>
    </ProductTabs>
  </div>

  <div v-else class="loading">
    <p>Загрузка товара...</p>
  </div>
</template>

<style scoped>
.product-page {
  padding: 0;
}

.product-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  margin-bottom: 40px;
}

.description-content {
  max-width: 800px;
}

.description-content p {
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-dark-gray);
  margin-bottom: 16px;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: 16px;
  color: var(--color-dark-gray);
}

@media (max-width: 1024px) {
  .product-container {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
</style>
