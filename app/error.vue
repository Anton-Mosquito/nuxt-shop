<script setup lang="ts">
import type { NuxtError } from "#app";

const { error } = defineProps<{ error: NuxtError }>();

function goHome() {
  return navigateTo("/");
}
</script>

<template>
  <div class="error__wrapper">
    <h1 class="">{{ error.statusCode }} error</h1>
    <div v-if="error.statusCode == 404" class="error__message">
      Page not found
    </div>
    <div v-else class="error__message">{{ error.statusMessage }}</div>
    <ActionButton color="ghost" @click="goHome">Go Back</ActionButton>
  </div>
</template>

<style scoped>
.error__wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 24px;
}

.error__message {
  color: var(--color-black);
  font-size: 20px;
  font-weight: 400;
  line-height: 26px;
  text-align: center;
  margin-bottom: 40px;
}
</style>
