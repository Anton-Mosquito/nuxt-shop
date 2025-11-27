<!-- pages/dashboard.vue -->
<script setup lang="ts">
const widgets = [
  { id: 1, component: "WidgetA", props: { data: [] } },
  { id: 2, component: "WidgetB", props: { data: null } }, // може впасти
  { id: 3, component: "WidgetC", props: { data: {} } },
];

const failedWidgets = ref<number[]>([]);

function handleWidgetError(widgetId: number, error: Error) {
  console.error(`Widget ${widgetId} failed:`, error);
  failedWidgets.value.push(widgetId);
}
</script>

<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">Dashboard</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="widget in widgets" :key="widget.id">
        <NuxtClientFallback
          @error="(error: Error) => handleWidgetError(widget.id, error)"
        >
          <!-- Динамічний компонент -->
          <component :is="widget.component" v-bind="widget.props" />

          <template #fallback="{ error }">
            <div
              class="p-6 border-2 border-dashed border-gray-300 rounded text-center"
            >
              <svg
                class="w-12 h-12 mx-auto text-gray-400 mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p class="text-gray-600 text-sm mb-2">Віджет недоступний</p>
              <details class="text-xs text-gray-500">
                <summary class="cursor-pointer">Деталі помилки</summary>
                <p class="mt-2">{{ error.message }}</p>
              </details>
            </div>
          </template>
        </NuxtClientFallback>
      </div>
    </div>

    <!-- Статистика помилок -->
    <DevOnly>
      <div
        v-if="failedWidgets.length"
        class="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded"
      >
        <p class="font-bold text-yellow-800">
          Failed widgets: {{ failedWidgets.join(", ") }}
        </p>
      </div>
    </DevOnly>
  </div>
</template>
