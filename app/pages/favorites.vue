<script setup lang="ts">
const favoriteStore = useFavoriteStore();
favoriteStore.addToFavorite(1);
</script>

<template>
  <div>
    <h1>{{ favoriteStore.favoriteIds }}</h1>
  </div>
</template>
