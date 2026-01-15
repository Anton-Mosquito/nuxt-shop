<script setup lang="ts">
import "~/assets/styles/main.css";
import { ERROR_MESSAGES } from "~/constants";

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

    <UiErrorBoundary
      title="Oops! Something went wrong."
      :message="ERROR_MESSAGES.GENERIC_ERROR"
      show-details
      retryable
      @error="handleAppError"
    >
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UiErrorBoundary>

    <UiToast />
    <UiPageLoader />
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

.nuxt-loading-indicator {
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
}
</style>
