<script setup lang="ts">
import type { Product, Review, Tab } from "~/types";
import { PRODUCT_TABS } from "~/constants/products";

interface Props {
  product: Product;
  reviews: Review[];
}

useSeoMeta({
  title: () =>
    data.value
      ? `${data.value.product.name} - Nuxt Shop`
      : "Product - Nuxt Shop",
  description: () =>
    data.value
      ? data.value.product.short_description
      : "Browse our extensive catalog of products at Nuxt Shop.",
  ogDescription: () =>
    data.value
      ? data.value.product.short_description
      : "Browse our extensive catalog of products at Nuxt Shop.",
  ogTitle: () =>
    data.value
      ? `${data.value.product.name} - Nuxt Shop`
      : "Product - Nuxt Shop",
});

const route = useRoute();
const API_URL = useAPI();
const { showLoader, hideLoader } = usePageLoader();

const { data, error, status } = await useFetch<Props>(
  () => `${API_URL}/products/${route.params.id}`,
  {
    lazy: true,
    watch: [() => route.params.id],
  }
);

const { activeTab, productTabs } = useTabManager();
const { reviewCount, productDescription, productImages } = useData();

watch(
  status,
  (newStatus) => {
    if (newStatus === "pending") {
      showLoader("Loading product details...");
    } else {
      hideLoader();
    }
  },
  { immediate: true }
);

watch(error, (newError) => {
  if (!newError) return;
  
  showError({
    statusCode: newError.statusCode || 500,
    statusMessage: newError.statusMessage || "Product not found",
    fatal: true,
  });
});

function useData() {
  const reviewCount = computed(() => data.value?.reviews?.length || 0);
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

  return {
    reviewCount,
    productDescription,
    productImages,
  };
}

function useTabManager() {
  const activeTab = ref("description");

  const productTabs = computed<Tab[]>(() =>
    PRODUCT_TABS.map((tab) => {
      if (tab.id !== "reviews") return tab;

      return {
        ...tab,
        badge: reviewCount.value,
      };
    })
  );

  return {
    activeTab,
    productTabs,
  };
}
</script>

<template>
  <div class="p-0">
    <UiPageLoader />

    <div v-if="data?.product">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-10">
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

      <UiTabs v-model="activeTab" :tabs="productTabs" lazy>
        <template #description>
          <div class="max-w-3xl text-sm leading-relaxed text-gray-600 mb-4">
            <p>
              {{ productDescription }}
            </p>
          </div>
        </template>
        <template #reviews>
          <LazyProductReviews
            :product-id="data.product.id"
            :reviews="data.reviews"
          />
        </template>
        <template #specifications>
          <div class="max-w-3xl text-sm leading-relaxed text-gray-600">
            <p>Specifications will be added later...</p>
          </div>
        </template>
      </UiTabs>
    </div>
  </div>
</template>
