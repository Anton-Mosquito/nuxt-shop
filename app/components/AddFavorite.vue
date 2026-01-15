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
    <transition name="favorite-fade" mode="out-in">
      <Icon
        :key="favoriteStore.isFavorite(id) ? 'filled' : 'outline'"
        :name="favoriteStore.isFavorite(id) ? 'mdi:heart' : 'mdi:heart-outline'"
        :size="variant === 'card' ? 18 : 20"
      />
    </transition>
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
  color: var(--color-dark-gray);
  transition: color 0.2s ease, border-color 0.2s ease;
}

.favorite-button--card {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 30;
  width: 36px;
  height: 36px;
}

.favorite-button--inline {
  position: static;
  width: 40px;
  height: 40px;
}

:is(.favorite-button--card, .favorite-button--inline):hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

:is(.favorite-button--card, .favorite-button--inline)[aria-pressed="true"] {
  color: var(--color-accent);
  border-color: var(--color-accent);
}

.favorite-fade-enter-active,
.favorite-fade-leave-active {
  transition: opacity 180ms ease, transform 180ms ease;
  display: inline-flex;
}
.favorite-fade-enter-from,
.favorite-fade-leave-to {
  opacity: 0;
  transform: scale(0.85);
}
.favorite-fade-enter-to,
.favorite-fade-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
