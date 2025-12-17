<script setup lang="ts">
const { variant } = defineProps<{
  variant: "gray" | "black";
}>();
const data = defineModel<string>();
</script>

<template>
  <input v-model="data" :class="[$style.input, $style[variant]]" />
</template>

<style module>
.input {
  padding: 12px 0;
  border: none;
  background: none;
  color: var(--color-black);

  ::placeholder {
    color: var(--color-dark-gray);
  }

  &.gray {
    border-bottom: 1px solid var(--color-gray);
  }

  &.black {
    border-bottom: 2px solid var(--color-black);
  }
}
</style>
