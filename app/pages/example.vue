<!-- В будь-якому компоненті -->
<script setup lang="ts">
const $toast = inject("$toast");

async function saveData() {
  try {
    await $fetch("/api/save");
    $toast.success("Дані збережено успішно!");
  } catch (error) {
    $toast.error("Помилка збереження даних");
  }
}
</script>
<!-- pages/example.vue -->
<template>
  <div class="container mx-auto p-6">
    <ErrorBoundary
      title="Помилка завантаження даних"
      message="Сервер тимчасово недоступний"
      show-details
      @retry="refetch"
    >
      <DataTable :data="data" />

      <template #actions="{ clearError }">
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
