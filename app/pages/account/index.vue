<script setup lang="ts">
definePageMeta({
  middleware: ["authenticated"],
});
</script>

<template>
  <div class="container mx-auto px-4 py-12 md:pb-24 max-w-[1240px]">
    <h1 class="text-center text-[28px] font-medium mb-12">My Profile</h1>
  </div>
</template>
