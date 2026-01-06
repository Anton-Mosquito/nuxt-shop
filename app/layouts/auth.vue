<script setup lang="ts">
import { APP_NAME } from "~/constants";
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-6">
        <NuxtLink
          to="/"
          class="inline-block transition-colors text-[var(--color-accent)] hover:text-[var(--color-black-hover)]"
          aria-label="Nuxt Shop - return to home"
          :prefetch="false"
        >
          <Icon name="icon:shop-outline" size="40" aria-hidden="true" />
          <h1
            class="text-3xl font-bold mt-1 text-[var(--color-accent)]"
          >
            {{ APP_NAME }}
          </h1>
        </NuxtLink>
      </div>

      <div class="bg-white rounded-2xl shadow-2xl p-8">
        <slot />
      </div>

      <p class="text-center text-black text-sm mt-6">
        © 2024 MyApp. All rights reserved.
      </p>
    </div>
  </div>
</template>
