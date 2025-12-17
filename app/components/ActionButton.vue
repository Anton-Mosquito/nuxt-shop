<script setup lang="ts">
const { color = "primary" } = defineProps<{
  color?: "primary" | "ghost";
}>();
</script>

<template>
  <button class="button" :class="color">
    <slot />
  </button>
</template>

<style scoped>
.button {
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
  border: 1px solid var(--color-black);
  cursor: pointer;
  font-family: var(--font);
  font-size: 16px;
  font-weight: 700;
  border-radius: 4px;
  padding: 16px;
}

.primary {
  background-color: var(--color-black);
  color: var(--color-white-light);

  &:hover {
    background-color: color-mix(
      in srgb,
      var(--color-black) 90%,
      var(--color-white-light) 10%
    );
  }
}

.ghost {
  color: var(--color-black);

  &:hover {
    background-color: color-mix(
      in srgb,
      var(--color-white-light) 90%,
      var(--color-black-hover) 10%
    );
  }
}
</style>
