<script setup lang="ts">
const { id, isShown = false } = defineProps<{
  id: number;
  isShown?: boolean;
}>();
const favoriteStore = useFavoriteStore();
</script>

<template>
  <button
    v-show="isShown || favoriteStore.isFavorite(id)"
    class="favorite-button"
    @click.stop.prevent="() => favoriteStore.toggleFavorite(id)"
  >
    <Icon name="icon:heart-outline" size="18" />
  </button>
</template>

<style scoped>
.favorite-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}
</style>
