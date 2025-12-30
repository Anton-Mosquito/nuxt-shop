<script setup lang="ts">
useSeoMeta({
  title: "Cart - Nuxt Shop",
  description: "View and manage your shopping cart at Nuxt Shop.",
  ogDescription: "View and manage your shopping cart at Nuxt Shop.",
});

const route = useRoute();
const { showLoader, hideLoader } = usePageLoader();

async function deleteProduct() {
  showLoader("Видалення продукту...");

  try {
    await $fetch(`/api/products/${route.params.id}`, {
      method: "DELETE",
    });

    await navigateTo("/products");
  } catch (error) {
    console.error(error);
  } finally {
    hideLoader();
  }
}
</script>

<template>
  <div>
    <h1>Catalog</h1>
    <button @click="deleteProduct">Видалити продукт</button>
  </div>
</template>
