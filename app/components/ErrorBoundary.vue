<script setup lang="ts">
import type { NuxtError } from "#app";

interface Props {
  title?: string;
  message?: string;
  showDetails?: boolean;
  retryable?: boolean;
}

const {
  title = "Error Occurred",
  message = "Failed to load content. Please try again.",
  showDetails = false,
  retryable = true,
} = defineProps<Props>();

const emit = defineEmits<{
  error: [Error | NuxtError];
}>();

const handleError = (error: Error | NuxtError) => {
  emit("error", error);
};
</script>

<template>
  <NuxtErrorBoundary @error="handleError">
    <slot />

    <template #error="{ error, clearError }">
      <div
        role="alert"
        aria-live="assertive"
        class="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500"
      >
        <div class="flex items-start gap-4">
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

          <div class="flex-1">
            <h3 class="text-lg font-bold text-gray-900 mb-1">
              {{ title }}
            </h3>
            <p class="text-gray-600 text-sm mb-4">
              {{ message || error.message }}
            </p>

            <DevOnly>
              <details v-if="showDetails" class="mb-4">
                <summary
                  class="text-sm text-gray-500 cursor-pointer hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                  tabindex="0"
                >
                  Technical Details
                </summary>
                <pre
                  class="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto max-h-60"
                  >{{ formatError(error) }}</pre
                >
              </details>
            </DevOnly>

            <div class="flex gap-3 flex-wrap">
              <button
                v-if="retryable"
                class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                @click="clearError"
              >
                Try Again
              </button>

              <slot name="actions" :clear-error="clearError" :error="error" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </NuxtErrorBoundary>
</template>
