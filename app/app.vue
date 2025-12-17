<script setup lang="ts">
import "~/assets/styles/main.css";

const hello = ref("Hello, Nuxt 4!");
const appConfig = useAppConfig();
const runtimeConfig = useRuntimeConfig();
const theme = ref(appConfig.theme || "default");
const token = ref(runtimeConfig.public.api_base);

console.log(appConfig.theme);

// throw createError({
//   statusCode: 401,
//   statusMessage: "Unauthorized",
//   data: {
//     myCustomField: true,
//   },
// });
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

<style lang="css" scoped>
div {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
