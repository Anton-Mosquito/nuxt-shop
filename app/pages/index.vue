<script setup lang="ts">
// useHead({
//   link: [
//     {
//       rel: "icon",
//       type: "image/x-icon",
//       href: "/favicon.ico",
//     },
//   ],
// });

useSeoMeta({
  title: "Catalog - Nuxt Shop",
  description: "Browse our extensive catalog of products at Nuxt Shop.",
  ogDescription: "Browse our extensive catalog of products at Nuxt Shop.",
});

function openAbout() {
  navigateTo("/about");
}

// function setLayout() {
//   setPageLayout("auth");
// }
</script>

<template>
  <div>
    <h1>Welcome Router</h1>
    <Icon name="icon:bar-outline" size="24" />
    <NuxtLink to="/">Go to Home</NuxtLink>
    <button @click="openAbout">navigate</button>
  </div>
</template>
