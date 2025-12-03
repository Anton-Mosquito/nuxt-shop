<!-- components/PageLoader.vue -->
<script setup lang="ts">
const isLoading = ref(false);
const loadingMessage = ref("");

// Global loading state
const showLoader = (message = "Завантаження...") => {
  isLoading.value = true;
  loadingMessage.value = message;
};

const hideLoader = () => {
  isLoading.value = false;
  loadingMessage.value = "";
};

// Експортуємо для використання в інших компонентах
defineExpose({ showLoader, hideLoader });

// Можна використовувати provide/inject
provide("pageLoader", { showLoader, hideLoader });
</script>

<template>
  <!-- Full page loader -->
  <Teleport to="body">
    <div
      v-if="isLoading"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div class="bg-white rounded-lg p-6 shadow-xl">
        <div class="flex items-center gap-3">
          <!-- Spinner (Nuxt Icon) -->
          <Icon
            name="heroicons-outline:arrow-path"
            class="animate-spin h-8 w-8 text-blue-600"
            aria-hidden="true"
          />

          <div>
            <p class="font-semibold text-gray-900">{{ loadingMessage }}</p>
            <p class="text-sm text-gray-500">Будь ласка, зачекайте...</p>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
