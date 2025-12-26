<script setup lang="ts">
import type { GetCategoriesResponse, GetProductsResponse } from "~/types/api";
import {
  LIMIT,
  DEBOUNCE_DELAY,
  MIN_PRICE,
  MAX_PRICE,
} from "~/constants/catalog";

useSeoMeta({
  title: "Catalog - Nuxt Shop",
  description: "Browse our extensive catalog of products at Nuxt Shop.",
  ogDescription: "Browse our extensive catalog of products at Nuxt Shop.",
});

const nuxtApp = useNuxtApp();
const API_URL = useAPI();
const route = useRoute();
const router = useRouter();

const { search } = useSearch();
const { categoryId, categoriesSelect } = useCategory();
const { priceFrom, priceTo } = usePrice();
const { hasDiscount } = useDiscount();
const { currentPage, apiQuery } = loadQueryParameters();

watch(
  () => route.query,
  (query) => {
    const normalized = {
      search: query.search?.toString() ?? "",
      category_id: query.category_id?.toString() ?? "",
      price_from: Number(query.price_from) || MIN_PRICE,
      price_to: Number(query.price_to) || MAX_PRICE,
      has_discount: query.has_discount === "true",
    };

    if (search.value !== normalized.search) search.value = normalized.search;
    if (categoryId.value !== normalized.category_id)
      categoryId.value = normalized.category_id;
    if (priceFrom.value !== normalized.price_from)
      priceFrom.value = normalized.price_from;
    if (priceTo.value !== normalized.price_to)
      priceTo.value = normalized.price_to;
    if (hasDiscount.value !== normalized.has_discount)
      hasDiscount.value = normalized.has_discount;
  }
);

const { data: productsData } = await useFetch<GetProductsResponse>(
  `${API_URL}/products`,
  {
    key: "get-products",
    query: apiQuery,
  }
);

const totalPages = computed(() => {
  const total = Number(productsData.value?.total ?? 0);
  return Math.max(1, Math.ceil(total / LIMIT));
});

const { data: categoriesData } = await useFetch<GetCategoriesResponse>(
  `${API_URL}/categories`,
  {
    transform(input) {
      return {
        ...input,
        fetchedAt: new Date().toISOString(),
      };
    },
    getCachedData(key) {
      const cached = nuxtApp.isHydrating
        ? nuxtApp.payload.data[key]
        : nuxtApp.static.data[key];

      if (!cached) return undefined;

      const fetchedAtRaw = cached.fetchedAt;
      if (!fetchedAtRaw) return undefined;

      const fetchedAt = new Date(fetchedAtRaw);
      const CACHE_TTL = 60_000_000;
      if (isNaN(fetchedAt.getTime())) return undefined;
      if (fetchedAt.getTime() + CACHE_TTL < Date.now()) return undefined;

      try {
        return typeof structuredClone === "function"
          ? structuredClone(cached)
          : JSON.parse(JSON.stringify(cached));
      } catch (e) {
        console.warn(
          "getCachedData cache clone failed, falling back to JSON clone:",
          e
        );
        return JSON.parse(JSON.stringify(cached));
      }
    },
  }
);

type QueryUpdates = Record<string, string | number | boolean | undefined> & {
  offset?: number | string | undefined;
};

const updateRoute = (queryUpdates: QueryUpdates) => {
  router.push({
    query: {
      ...route.query,
      ...queryUpdates,
      offset: queryUpdates.offset ?? 1,
    },
  });
};

function useSearch() {
  const search = ref(route.query.search?.toString() ?? "");

  const debouncedSearchUpdate = useDebounceFn(() => {
    updateRoute({
      search: search.value || undefined,
    });
  }, DEBOUNCE_DELAY);

  watch(search, () => debouncedSearchUpdate());

  return { search };
}

function useCategory() {
  const categoryId = ref(route.query.category_id?.toString() ?? "");

  watch(categoryId, (newVal) => {
    updateRoute({ category_id: newVal || undefined });
  });

  const selectDefault = {
    value: "",
    label: "Select a category",
  };

  const categoriesSelect = computed(() =>
    [selectDefault].concat(
      categoriesData.value?.categories.map((category) => ({
        value: `${category.id}`,
        label: category.name,
      })) ?? []
    )
  );

  return { categoryId, categoriesSelect };
}

function usePrice() {
  const priceFrom = ref(Number(route.query.price_from) || 0);
  const priceTo = ref(Number(route.query.price_to) || 1200);

  const debouncedPriceUpdate = useDebounceFn(() => {
    updateRoute({
      price_from: priceFrom.value > 0 ? priceFrom.value : undefined,
      price_to: priceTo.value < 1200 ? priceTo.value : undefined,
    });
  }, DEBOUNCE_DELAY);

  watch([priceFrom, priceTo], () => debouncedPriceUpdate());

  return { priceFrom, priceTo };
}

function useDiscount() {
  const hasDiscount = ref(route.query.has_discount === "true");

  watch(hasDiscount, (newVal) => {
    updateRoute({ has_discount: newVal ? "true" : undefined });
  });

  return { hasDiscount };
}

function loadQueryParameters() {
  const currentPage = computed(() => Number(route.query.offset) || 1);

  const apiQuery = computed(() => ({
    limit: LIMIT,
    offset: (currentPage.value - 1) * LIMIT,
    category_id: route.query.category_id || undefined,
    search: route.query.search || undefined,
    price_from: route.query.price_from || undefined,
    price_to: route.query.price_to || undefined,
    has_discount: route.query.has_discount || undefined,
  }));

  return { currentPage, apiQuery };
}
</script>

<template>
  <section class="catalog-page">
    <h1 class="catalog-page__title">Product catalog</h1>
    <div class="catalog-page__layout">
      <div class="catalog-page__filter">
        <div class="catalog-page__search">
          <UiInput
            v-model="search"
            variant="default"
            placeholder="Search..."
            icon="mdi:magnify"
          />
        </div>
        <SelectField v-model="categoryId" :options="categoriesSelect" />
        <UiRangeSlider
          v-model:min-value="priceFrom"
          v-model:max-value="priceTo"
          :min="0"
          :max="1200"
          :step="10"
          locale="en-US"
          currency="USD"
          spacing="medium"
          bold
        />
        <UiDiscountToggle v-model="hasDiscount" />
      </div>
      <div class="catalog-page__content">
        <ProductGrid
          v-if="productsData?.products"
          :products="productsData.products"
          :columns="3"
        />
        <UiPagination
          v-if="totalPages > 1"
          :current-page="currentPage"
          :total-pages="totalPages"
          base-url="/catalog"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.catalog-page__title {
  font-size: 32px;
  font-weight: 400;
  margin-bottom: 48px;
  text-align: left;
}

.catalog-page__layout {
  display: flex;
  gap: 36px;
}

.catalog-page__filter {
  width: 260px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.catalog-page__search {
  position: relative;
}

.catalog-page__content {
  flex: 1;
}

@media (max-width: 1024px) {
  .catalog-page__layout {
    flex-direction: column;
  }

  .catalog-page__filter {
    width: 100%;
  }
}
</style>
