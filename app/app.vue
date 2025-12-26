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

const { handleGlobalError } = useGlobalErrorHandler();

const handleAppError = (error: Error) => {
  handleGlobalError(error, "App Boundary", {
    showToast: true,
    preventReload: true,
  });
};
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator
      color="linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)"
      :height="4"
      :duration="3000"
    />

    <ErrorBoundary
      title="Oops! Something went wrong."
      message="We apologize for the inconvenience. We are already working on a solution."
      show-details
      retryable
      @error="handleAppError"
    >
      <NuxtLayout>
        <main class="main">
          <NuxtPage :transition="{ name: 'page', mode: 'out-in' }" />
        </main>
      </NuxtLayout>
    </ErrorBoundary>

    <ToastContainer />
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
