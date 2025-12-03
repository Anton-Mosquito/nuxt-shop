<!-- pages/dashboard/analytics.vue -->
<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
  title: "Аналітика",
});

// Дані що можуть не завантажитись
const { data: analytics, error: analyticsError } = await useFetch(
  "/api/analytics"
);
const { data: stats, error: statsError } = await useFetch("/api/stats");
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Аналітика</h1>

    <!-- Обгортаємо кожну секцію окремо -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Analytics Chart -->
      <NuxtErrorBoundary>
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold mb-4">Графік продажів</h2>
          <AnalyticsChart :data="analytics" />
        </div>

        <template #error="{ error, clearError }">
          <div class="bg-red-50 border border-red-200 rounded-lg p-6">
            <div class="flex items-start gap-3">
              <Icon
                name="heroicons-outline:exclamation-circle"
                class="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div class="flex-1">
                <h3 class="font-bold text-red-800 mb-1">
                  Не вдалося завантажити графік
                </h3>
                <p class="text-sm text-red-600 mb-3">
                  {{
                    error.message || "Виникла помилка при завантаженні даних"
                  }}
                </p>
                <button
                  class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                  @click="clearError"
                >
                  Спробувати ще раз
                </button>
              </div>
            </div>
          </div>
        </template>
      </NuxtErrorBoundary>

      <!-- Stats Cards -->
      <NuxtErrorBoundary>
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold mb-4">Статистика</h2>
          <StatsCards :data="stats" />
        </div>

        <template #error="{ error, clearError }">
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div class="flex items-center gap-3">
              <Icon
                name="heroicons-outline:exclamation-triangle"
                class="w-6 h-6 text-yellow-500"
                aria-hidden="true"
              />
              <div>
                <p class="font-medium text-yellow-800">
                  Статистика тимчасово недоступна
                </p>
                <button
                  class="text-sm text-yellow-600 hover:text-yellow-800 underline mt-1"
                  @click="clearError"
                >
                  Оновити
                </button>
              </div>
            </div>
          </div>
        </template>
      </NuxtErrorBoundary>
    </div>
  </div>
</template>
