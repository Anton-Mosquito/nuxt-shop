<script setup lang="ts">
import SelectField from "~/components/SelectField.vue";
import type { IGetCategoriesResponse } from "~/interfaces/category.interface";
import type { IGetProductsResponse } from "~/interfaces/product.interface";

const config = useRuntimeConfig();
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
  `${config.public.api_url}/categories`
);

const selectDefault = {
  value: "",
  label: "Select a category",
};

const categoriesSelect = computed(
  () =>
    data.value?.categories
      .map(({ id, name }) => ({
        value: `${id}`,
        label: name,
      }))
      .concat([selectDefault]) ?? [selectDefault]
);

const { data: productsData } = await useFetch<IGetProductsResponse>(
  `${config.public.api_url}/products`,
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
  <div>
    <h1 class="left">Catalog goods</h1>
    <div class="catalog">
      <div class="catalog__filter">
        <div class="catalog__search">
          <InputField v-model="search" variant="gray" placeholder="Search..." />
          <Icon name="icon:bar-outline" size="24" />
        </div>
        <SelectField v-model="category_id" :options="categoriesSelect" />
      </div>
      <div class="catalog__grid">
        <CatalogCard
          v-for="product in productsData?.products"
          :key="product.id"
          v-bind="product"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.left {
  text-align: left;
}

.catalog {
  display: flex;
  gap: 36px;

  & .catalog__filter {
    width: 260px;
    display: flex;
    flex-direction: column;
    gap: 24px;

    & .catalog__search {
      position: relative;

      & span[class*="icon:bar-outline"] {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
      }
    }
  }

  & .catalog__grid {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 64px 12px;
  }
}
</style>
