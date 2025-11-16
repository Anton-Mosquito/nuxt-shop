<script setup lang="ts">
import SelectField from "~/components/SelectField.vue";
import type { IGetCategoriesResponse } from "~/interfaces/category.interface";
import type { IGetProductsResponse } from "~/interfaces/product.interface";

useSeoMeta({
  title: "Catalog - Nuxt Shop",
  description: "Browse our extensive catalog of products at Nuxt Shop.",
  ogDescription: "Browse our extensive catalog of products at Nuxt Shop.",
});
// useHead({
//   title: "Catalog - Nuxt Shop",
//   meta: [
//     {
//       name: "description",
//       content: "Browse our extensive catalog of products at Nuxt Shop.",
//     },
//   ],
// });

const API_URL = useAPI();
const route = useRoute();
const router = useRouter();
const category_id = ref(route.query.category_id?.toString() ?? "");
const search = ref(route.query.search?.toString() ?? "");

watch([category_id, search], () => {
  changeRoute(category_id, search);
});

const changeRoute = useDebounceFn((category_id, search) => {
  router.replace({
    query: {
      ...route.query,
      category_id: category_id.value,
      search: search.value,
    },
  });
}, 300);

const query = computed(() => ({
  limit: route.query.limit ?? 20,
  offset: route.query.offset ?? 0,
  category_id: route.query.category_id || undefined,
  search: route.query.search || undefined,
}));

const { data } = await useFetch<IGetCategoriesResponse>(
  `${API_URL}/categories`
);

const selectDefault = {
  value: "",
  label: "Select a category",
};

const categoriesSelect = computed(() =>
  [selectDefault].concat(
    data.value?.categories.map(({ id, name }) => ({
      value: `${id}`,
      label: name,
    })) ?? []
  )
);

const { data: productsData } = await useFetch<IGetProductsResponse>(
  `${API_URL}/products`,
  {
    key: "get-products",
    query,
  }
);

// const { data, error, refresh } = await useAsyncData(
//   "categories",
//   () =>
//     $fetch<IGetCategoriesResponse>(`${config.public.api_url}/categories`, {
//       method: "GET",
//     }),
//   {
//     watch: [input],
//   }
// );

// async function sendRequest() {
//   await refresh();
// }

//$fetch - no ssr friendly
// useFetch - ssr friendly use only in setup
// useAsyncData - ssr friendly use in setup and outside setup, complex variants

// try {
//   const data = await $fetch<IGetCategoriesResponse>(
//     `${config.public.api_url}/categories`
//   );
//   console.log("🚀 ~ data:", data);
// } catch (error) {
//   console.error("Error fetching categories:", error);
// }
</script>

<template>
  <div class="catalog-page">
    <h1 class="catalog-page__title">Каталог товарів</h1>
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
        <SelectField v-model="category_id" :options="categoriesSelect" />
      </div>
      <div class="catalog-page__content">
        <ProductGrid
          v-if="productsData?.products"
          :products="productsData.products"
          :columns="3"
        />
      </div>
    </div>
  </div>
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
