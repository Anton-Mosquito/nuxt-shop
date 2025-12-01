<!-- layouts/default.vue - Публічний сайт -->
<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navigation -->
    <Navigation />

    <slot />

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="font-bold text-lg mb-4">Про нас</h3>
            <p class="text-gray-400 text-sm">
              Ми створюємо неймовірні продукти для вашого бізнесу.
            </p>
          </div>
          <div>
            <h3 class="font-bold text-lg mb-4">Продукти</h3>
            <ul class="space-y-2 text-sm text-gray-400">
              <li>
                <NuxtLink to="/products" class="hover:text-white"
                  >Каталог</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/pricing" class="hover:text-white">Ціни</NuxtLink>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold text-lg mb-4">Компанія</h3>
            <ul class="space-y-2 text-sm text-gray-400">
              <li>
                <NuxtLink to="/about" class="hover:text-white"
                  >Про нас</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/blog" class="hover:text-white">Блог</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/contact" class="hover:text-white"
                  >Контакти</NuxtLink
                >
              </li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold text-lg mb-4">Підпишіться</h3>
            <form class="flex gap-2">
              <input
                type="email"
                placeholder="Ваш email"
                class="flex-1 px-3 py-2 rounded bg-gray-800 text-white text-sm"
              />
              <button
                class="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 text-sm"
              >
                OK
              </button>
            </form>
          </div>
        </div>
        <div
          class="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400"
        >
          © 2024 MyApp. Всі права захищені.
        </div>
      </div>
    </footer>
  </div>
</template>
