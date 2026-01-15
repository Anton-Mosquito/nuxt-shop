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
