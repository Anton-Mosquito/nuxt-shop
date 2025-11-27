<!-- components/PropsInspector.vue -->
<script setup lang="ts">
const props = defineProps<{
  data: unknown;
  label?: string;
}>();

const isExpanded = ref(true);
const formatted = computed(() => JSON.stringify(props.data, null, 2));
</script>

<template>
  <div class="border-2 border-yellow-400 bg-yellow-50 p-4 rounded my-4">
    <div class="flex items-center justify-between mb-2">
      <h4 class="font-bold text-yellow-800">
        🔍 {{ label || "Props Inspector" }}
      </h4>
      <button
        @click="isExpanded = !isExpanded"
        class="text-sm text-yellow-600 hover:text-yellow-800"
      >
        {{ isExpanded ? "Згорнути" : "Розгорнути" }}
      </button>
    </div>

    <pre
      v-if="isExpanded"
      class="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-auto max-h-64"
      >{{ formatted }}</pre
    >
  </div>
</template>
