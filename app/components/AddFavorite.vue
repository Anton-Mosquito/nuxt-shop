<script setup lang="ts">
interface Props {
  id: number;
  isShown?: boolean;
  variant?: "card" | "inline";
}

const { id, isShown = false, variant = "card" } = defineProps<Props>();
const favoriteStore = useFavoriteStore();
</script>
<template>
  <button
    v-show="isShown || favoriteStore.isFavorite(id)"
    :class="['favorite-button', `favorite-button--${variant}`]"
    :aria-pressed="favoriteStore.isFavorite(id)"
    @click.stop.prevent="() => favoriteStore.toggleFavorite(id)"
  >
    <Icon
      :name="favoriteStore.isFavorite(id) ? 'mdi:heart' : 'mdi:heart-outline'"
      :size="variant === 'card' ? 18 : 20"
    />
  </button>
</template>

<style scoped>
.favorite-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.favorite-button--card {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 30;
  width: 36px;
  height: 36px;
  background: var(--color-white-light, #fff);
}

.favorite-button--inline {
  position: static;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  color: var(--color-dark-gray);
}

.favorite-button--card:hover,
.favorite-button--inline:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.favorite-button--card[aria-pressed="true"],
.favorite-button--inline[aria-pressed="true"] {
  color: var(--color-accent);
  border-color: var(--color-accent);
}
</style>
