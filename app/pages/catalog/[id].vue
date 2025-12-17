<script setup lang="ts">
import type { Product, Review, Tab } from "~/types";

interface Props {
  product: Product;
  reviews: Review[];
}

const route = useRoute();
const API_URL = useAPI();
const id = ref(route.params.id);

const { data } = await useFetch<Props>(`${API_URL}/products/${id.value}`);
const activeTab = ref("description");
const reviewCount = computed(() => data.value?.reviews?.length || 0);
const productTabs = computed<Tab[]>(() => [
  {
    id: "description",
    label: "Description",
    icon: "mdi:text-box-outline",
  },
  {
    id: "reviews",
    label: "Reviews",
    icon: "mdi:star-outline",
    badge: reviewCount.value,
  },
  {
    id: "specifications",
    label: "Specifications",
    icon: "mdi:format-list-bulleted",
    disabled: true,
  },
]);

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

const productDescription = computed(
  () =>
    data.value?.product.long_description ||
    data.value?.product.short_description ||
    "No description available."
);

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
      <ProductInfo
        :product="data.product"
        :reviews="data.reviews"
        :review-count="reviewCount"
      />
    </div>

    <UiTabs v-model="activeTab" :tabs="productTabs">
      <template #description>
        <div class="description-content">
          <p>
            {{ productDescription }}
          </p>
        </div>
      </template>
      <template #reviews>
        <ProductReviews :reviews="data.reviews" />
      </template>
      <template #specifications>
        <div class="specifications-content">
          <p>Specifications will be added later...</p>
        </div>
      </template>
    </UiTabs>

    <!-- Показується тільки в dev -->
    <DevOnly>
      <PropsInspector :data="data.product" label="Product Data" />
      <PropsInspector :data="route.params" label="Route Params" />
    </DevOnly>
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
