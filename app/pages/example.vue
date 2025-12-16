<!-- pages/example.vue -->
<script setup lang="ts">
const $toast = inject("$toast");
const data = ref([]);

async function refetch() {
  try {
    data.value = await $fetch("/api/data");
    $toast.success("Дані завантажено успішно!");
  } catch (error) {
    $toast.error("Помилка завантаження даних");
    throw error; // Re-throw to let ErrorBoundary catch it
  }
}

function handleError(error: Error) {
  console.error("Data loading error:", error);
}

onMounted(() => {
  refetch();
});
</script>
<template>
  <div class="container mx-auto p-6">
    <ErrorBoundary
      title="Помилка завантаження даних"
      message="Сервер тимчасово недоступний"
      show-details
      retryable
      :max-retries="3"
      error-context="Example Page Data Table"
      prevent-reload
      @retry="refetch"
      @error="handleError"
    >
      <DataTable :data="data" />

      <template #actions="{ clearError, retry }">
        <button
          @click="retry"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
        >
          Повторити
        </button>
        <NuxtLink
          to="/"
          class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
        >
          На головну
        </NuxtLink>
      </template>
    </ErrorBoundary>
  </div>
</template>
