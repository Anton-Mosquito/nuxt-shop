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
    :aria-pressed="favoriteStore.isFavorite(id)"
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
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 30;
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--color-white-light, #fff);
  border-radius: 50%;
  transition: transform 0.12s ease, box-shadow 0.12s ease;
}

.favorite-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}
</style>
