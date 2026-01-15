<!-- components/RiskyComponent.vue -->
<script setup lang="ts">
const props = defineProps<{
  data: any[];
}>();

// Може впасти якщо data undefined або не масив
const processedData = computed(() => {
  // Твій код: обробка даних що може впасти
  return props.data.map((item) => item.value * 2);
});
</script>

<template>
  <div class="p-4 border rounded">
    <h3 class="font-bold mb-2">Оброблені дані</h3>
    <ul>
      <li v-for="(value, index) in processedData" :key="index">
        {{ value }}
      </li>
    </ul>
  </div>
</template>
