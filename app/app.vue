<script setup lang="ts">
//import type { LayoutKey } from "#build/types/layouts";
import "~/assets/styles/main.css";

// Можна контролювати програмно
// const { start, finish, clear } = useLoadingIndicator({
//   duration: 2000,
//   throttle: 200,
// });

// // Приклад: показати при довгій операції
// async function longOperation() {
//   start();
//   try {
//     await someAsyncOperation();
//     finish();
//   } catch (error) {
//     clear();
//   }
// }

//const name = ref<LayoutKey>("auth");
// Глобальний обробник помилок
const handleError = (error: any) => {
  console.error("Global error:", error);

  // Можна відправити на сервер логування
  if (import.meta.client) {
    // Sentry, LogRocket, etc
  }
};

const toastContainer = ref();

// Global toast helper
const toast = {
  success: (message: string, duration?: number) =>
    toastContainer.value?.addToast({ type: "success", message, duration }),
  error: (message: string, duration?: number) =>
    toastContainer.value?.addToast({ type: "error", message, duration }),
  warning: (message: string, duration?: number) =>
    toastContainer.value?.addToast({ type: "warning", message, duration }),
  info: (message: string, duration?: number) =>
    toastContainer.value?.addToast({ type: "info", message, duration }),
};

// Відслідковування route errors
const router = useRouter();
router.onError((error) => {
  console.error("Router error:", error);
});

// Provide globally
provide("$toast", toast);
</script>

<template>
  <div>
    <NuxtLoadingIndicator
      color="linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)"
      :height="4"
      :duration="3000"
    />
    <NuxtErrorBoundary @error="handleError">
      <NuxtLayout>
        <main class="main">
          <NuxtPage :transition="{ name: 'page', mode: 'out-in' }" />
        </main>
      </NuxtLayout>

      <!-- Global fallback -->
      <template #error="{ error }">
        <div
          class="min-h-screen flex items-center justify-center bg-gray-50 p-4"
        >
          <div
            class="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center"
          >
            <div
              class="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center"
            >
              <Icon
                name="heroicons-outline:x-mark"
                class="w-10 h-10 text-red-600"
                aria-hidden="true"
              />
            </div>

            <h1 class="text-3xl font-bold text-gray-900 mb-3">
              Упс! Щось пішло не так
            </h1>
            <p class="text-gray-600 mb-6">
              Вибачте за незручності. Ми вже працюємо над вирішенням проблеми.
            </p>
            <div class="space-y-3">
              <button
                class="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                @click="$router.go(0)"
              >
                Перезавантажити сторінку
              </button>

              <NuxtLink
                to="/"
                class="block w-full px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
              >
                Повернутись на головну
              </NuxtLink>
            </div>
            <DevOnly>
              <details class="mt-6 text-left">
                <summary class="text-sm text-gray-500 cursor-pointer">
                  Debug Info
                </summary>
                <pre
                  class="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto"
                  >{{ error }}</pre
                >
              </details>
            </DevOnly>
          </div>
        </div>
      </template>
    </NuxtErrorBoundary>
    <ToastContainer ref="toastContainer" />
  </div>
</template>

<style lang="css" scoped>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}

.main {
  margin: 0 auto;
  max-width: 1248px;
  padding: 40px 16px;
}

/* Кастомні стилі для loading indicator */
.nuxt-loading-indicator {
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
}
</style>
