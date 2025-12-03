<!-- components/ErrorBoundary.vue -->
<script setup lang="ts">
const props = defineProps<{
  title?: string;
  message?: string;
  showDetails?: boolean;
  retryable?: boolean;
}>();

const emit = defineEmits<{
  retry: [];
}>();

const errorDetails = ref<any>(null);
</script>

<template>
  <NuxtErrorBoundary @error="errorDetails = $event">
    <slot />

    <template #error="{ error, clearError }">
      <div class="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500">
        <div class="flex items-start gap-4">
          <!-- Icon -->
          <div class="flex-shrink-0">
            <div
              class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center"
            >
              <Icon
                name="heroicons-outline:exclamation-circle"
                class="w-6 h-6 text-red-600"
                aria-hidden="true"
              />
            </div>
          </div>

          <!-- Content -->
          <div class="flex-1">
            <h3 class="text-lg font-bold text-gray-900 mb-1">
              {{ title || "Виникла помилка" }}
            </h3>
            <p class="text-gray-600 text-sm mb-4">
              {{ message || error.message || "Не вдалося завантажити контент" }}
            </p>

            <!-- Error details (collapsible) -->
            <details v-if="showDetails" class="mb-4">
              <summary
                class="text-sm text-gray-500 cursor-pointer hover:text-gray-700"
              >
                Технічні деталі
              </summary>
              <pre class="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">{{
                error
              }}</pre>
            </details>

            <!-- Actions -->
            <div class="flex gap-3">
              <button
                v-if="retryable !== false"
                class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                @click="
                  clearError();
                  emit('retry');
                "
              >
                Спробувати ще раз
              </button>

              <slot name="actions" :clear-error="clearError" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </NuxtErrorBoundary>
</template>
