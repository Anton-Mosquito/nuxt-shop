<!-- components/RetryableComponent.vue -->
<script setup lang="ts">
const props = defineProps<{
  maxRetries?: number;
}>();

const retryCount = ref(0);
const componentKey = ref(0);

const shouldRetry = computed(() => {
  return retryCount.value < (props.maxRetries || 3);
});

function retry() {
  retryCount.value++;
  componentKey.value++; // Force re-render
}
</script>

<template>
  <NuxtClientFallback>
    <!-- Використовуй key для force re-render -->
    <slot :key="componentKey" />

    <template #fallback="{ error }">
      <div class="p-6 border border-red-200 bg-red-50 rounded">
        <h3 class="font-bold text-red-800 mb-2">Помилка завантаження</h3>
        <p class="text-sm text-red-600 mb-4">{{ error.message }}</p>

        <div class="flex items-center gap-3">
          <button
            v-if="shouldRetry"
            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            @click="retry"
          >
            Спробувати ще раз ({{ retryCount }}/{{ maxRetries || 3 }})
          </button>

          <p v-else class="text-sm text-red-600">
            Перевищено ліміт спроб. Спробуйте перезавантажити сторінку.
          </p>
        </div>
      </div>
    </template>
  </NuxtClientFallback>
</template>
