<script setup lang="ts">
function openAbout() {
  navigateTo("/about");
}
</script>

<template>
  <div>
    <h1>Welcome Router</h1>
    <NuxtLink to="/">Go to Home</NuxtLink>
    <button @click="openAbout">navigate</button>
  </div>
</template>
