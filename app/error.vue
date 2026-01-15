<script setup lang="ts">
import type { NuxtError } from "#app";
import { ERROR_MESSAGES, ROUTES } from "~/constants";

const { error } = defineProps<{ error: NuxtError }>();

function goHome() {
  return navigateTo(ROUTES.HOME);
}
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen gap-4 px-4"
    role="alert"
    aria-live="assertive"
    aria-labelledby="error-title"
    aria-describedby="error-desc"
  >
    <h1 id="error-title" class="text-3xl font-semibold mb-2">
      {{ error.statusCode }} error
    </h1>

    <div
      v-if="error.statusCode == 404"
      id="error-desc"
      class="text-xl font-normal leading-7 text-center mb-8"
    >
      {{ ERROR_MESSAGES.PAGE_NOT_FOUND }}
    </div>

    <div
      v-else
      id="error-desc"
      class="text-xl font-normal leading-7 text-center mb-8"
    >
      {{ error.statusMessage }}
    </div>

    <UiButton variant="ghost" aria-label="Go back to home" @click="goHome">
      Go Back
    </UiButton>
  </div>
</template>
