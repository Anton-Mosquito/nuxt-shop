<!-- pages/products/[id].vue -->
<script setup lang="ts">
const route = useRoute();

const { data: product } = await useFetch(`/api/products/${route.params.id}`);
</script>

<template>
  <div class="container mx-auto p-6">
    <!-- Main error boundary для всієї сторінки -->
    <NuxtErrorBoundary>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Product info -->
        <div class="lg:col-span-2">
          <h1 class="text-3xl font-bold mb-4">{{ product.name }}</h1>
          <p class="text-gray-600 mb-6">{{ product.description }}</p>

          <!-- Reviews section з окремою error boundary -->
          <NuxtErrorBoundary>
            <div class="bg-white rounded-lg shadow p-6">
              <h2 class="text-xl font-bold mb-4">Відгуки</h2>
              <ProductReviews :product-id="product.id" />
            </div>

            <template #error="{ clearError }">
              <div class="bg-gray-50 rounded-lg p-6 text-center">
                <p class="text-gray-600 mb-3">Не вдалося завантажити відгуки</p>
                <button
                  class="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  @click="clearError"
                >
                  Спробувати ще раз
                </button>
              </div>
            </template>
          </NuxtErrorBoundary>

          <!-- Related products section -->
          <NuxtErrorBoundary>
            <div class="mt-6">
              <h2 class="text-xl font-bold mb-4">Схожі товари</h2>
              <RelatedProducts :category="product.category" />
            </div>

            <template #error>
              <div class="text-gray-500 text-sm italic">
                Схожі товари недоступні
              </div>
            </template>
          </NuxtErrorBoundary>
        </div>

        <!-- Sidebar -->
        <div>
          <div class="bg-white rounded-lg shadow p-6 sticky top-6">
            <div class="text-3xl font-bold text-blue-600 mb-4">
              {{ product.price }} грн
            </div>
            <button
              class="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-3"
            >
              Купити зараз
            </button>
            <button
              class="w-full py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
            >
              В кошик
            </button>
          </div>
        </div>
      </div>

      <!-- Fallback для всієї сторінки -->
      <template #error="{ error }">
        <div class="min-h-[60vh] flex items-center justify-center">
          <div class="text-center max-w-md">
            <Icon
              name="ic:outline-error-outline"
              class="w-24 h-24 mx-auto text-gray-400 mb-6"
              aria-hidden="true"
            />
            <h2 class="text-2xl font-bold text-gray-900 mb-2">
              Щось пішло не так
            </h2>
            <p class="text-gray-600 mb-6">
              Не вдалося завантажити інформацію про продукт
            </p>
            <div class="flex gap-3 justify-center">
              <NuxtLink
                to="/products"
                class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                prefetch
              >
                До каталогу
              </NuxtLink>
              <button
                class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                @click="$router.go(0)"
              >
                Оновити
              </button>
            </div>
          </div>
        </div>
      </template>
    </NuxtErrorBoundary>
  </div>
</template>
