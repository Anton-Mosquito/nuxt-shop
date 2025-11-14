<script setup lang="ts">
import type { IProduct } from "~/interfaces/product.interface";

const route = useRoute();
const API_URL = useAPI();
const id = ref(route.params.id);
const { data } = await useFetch<{ product: IProduct }>(
  `${API_URL}/products/${id.value}`
);

// useSeoMeta({
//   title: data.value
//     ? `${data.value.product.name} - Nuxt Shop`
//     : "Product - Nuxt Shop",
//   description: data.value
//     ? data.value.product.short_description
//     : "Browse our extensive catalog of products at Nuxt Shop.",
//   ogDescription: data.value
//     ? data.value.product.short_description
//     : "Browse our extensive catalog of products at Nuxt Shop.",
// });
</script>

<template>
  <div>
    <Head>
      <Title>{{ data?.product.name }}</Title>
      <Meta
        name="description"
        :content="`${data?.product.short_description}`"
      />
    </Head>
    <h1>Dynamic path {{ id }}</h1>
    <p>{{ data?.product.name }}</p>
  </div>
</template>
