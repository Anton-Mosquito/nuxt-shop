<!-- pages/dashboard.vue -->
<script setup lang="ts">
import type { GetCategoriesResponse } from "~/types";

definePageMeta({
  layout: "dashboard",
  title: "Головна панель",
  //middleware: "auth", // захист сторінки
});

const { data: stats } = await useFetch("/api/stats");

const chartData = computed(() => stats.value?.map((s) => s.value) || []);
const chartLabels = computed(() => stats.value?.map((s) => s.label) || []);

const API_URL = useAPI();
const { data } = await useFetch<GetCategoriesResponse>(`${API_URL}/categories`);

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
  <div class="w-full p-6">
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
              <Icon
                name="heroicons-outline:exclamation-circle"
                class="w-12 h-12 mx-auto text-gray-400 mb-3"
                aria-hidden="true"
              />
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

    <h1 class="text-3xl font-bold mb-6">Налаштування</h1>

    <!-- ❌ БЕЗ ClientOnly - буде помилка SSR -->
    <!-- <UserPreferences /> -->

    <!-- ✅ З ClientOnly - працює коректно -->
    <ClientOnly>
      <UserPreferences />

      <!-- Fallback під час SSR -->
      <template #fallback>
        <div class="p-4 border rounded animate-pulse">
          <div class="h-6 bg-gray-200 rounded mb-4"></div>
          <div class="h-10 bg-gray-200 rounded mb-4"></div>
          <div class="h-10 bg-gray-200 rounded"></div>
        </div>
      </template>
    </ClientOnly>

    <div>
      <!-- Працює тільки на клієнті -->
      <ClientOnly>
        <WindowSize />
        <template #fallback>
          <div class="p-4 bg-gray-100 rounded">
            Завантаження розміру вікна...
          </div>
        </template>
      </ClientOnly>
    </div>

    <RetryableComponent :max-retries="5">
      <RiskyComponent :data="data?.categories ?? []" />
    </RetryableComponent>

    <HeroSection
      title="Ласкаво просимо"
      subtitle="Створюємо неймовірні речі"
      image="/images/hero-desktop.jpg"
      mobile-image="/images/hero-mobile.jpg"
    />

    <UserProfile />

    <ResponsiveHero
      mobile-image="/images/hero-mobile-portrait.jpg"
      tablet-image="/images/hero-tablet-landscape.jpg"
      desktop-image="/images/hero-desktop-wide.jpg"
      title="Створюємо майбутнє разом"
      description="Інноваційні рішення для вашого бізнесу з використанням новітніх технологій"
    />

    <div class="container mx-auto p-6">
      <h1 class="text-4xl font-bold mb-8">Наші роботи</h1>
      <div class="space-y-12">
        <BeforeAfterSlider
          before-image="/images/projects/before1.jpg"
          after-image="/images/projects/after1.jpg"
          label="Редизайн інтерфейсу"
        />
        <BeforeAfterSlider
          before-image="/images/projects/before2.jpg"
          after-image="/images/projects/after2.jpg"
          label="Оптимізація продуктивності"
        />
      </div>
    </div>

    <!-- Легкий контент гідратується одразу -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-bold mb-4">Статистика</h2>
      <div class="space-y-2">
        <div class="flex justify-between">
          <span>Користувачі:</span>
          <span class="font-bold">1,234</span>
        </div>
        <div class="flex justify-between">
          <span>Замовлення:</span>
          <span class="font-bold">567</span>
        </div>
      </div>
    </div>

    <!-- Тяжкий компонент з відкладеною гідратацією -->
    <!-- Гідратується тільки коли стане видимим -->
    <ClientOnly>
      <NuxtIsland
        name="HeavyChart"
        :props="{
          data: chartData,
          labels: chartLabels,
        }"
      />

      <template #fallback>
        <div class="w-full h-64 bg-gray-100 rounded-lg animate-pulse"></div>
      </template>
    </ClientOnly>
  </div>
</template>
