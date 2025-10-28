<script setup lang="ts">
const hello = ref("Hello, Nuxt 4!");
const appConfig = useAppConfig();
const runtimeConfig = useRuntimeConfig();
const theme = ref(appConfig.theme || "default");
const token = ref(runtimeConfig.public.api_base);

console.log(appConfig.theme);
</script>

<template>
  <div>
    {{ hello }}
    <div>theme: {{ theme }}</div>
    <div>token: {{ token }}</div>
    <SharedUsersTestComponent />
    <WidgetComponent />
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
    <NuxtPage />
  </div>
</template>
