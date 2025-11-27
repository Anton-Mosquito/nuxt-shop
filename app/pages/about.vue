<script setup lang="ts">
import type { GetCategoriesResponse } from "~/types";

const API_URL = useAPI();
const { data } = await useFetch<GetCategoriesResponse>(`${API_URL}/categories`);
</script>

<template>
  <div class="container mx-auto p-6">
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
  </div>
</template>
