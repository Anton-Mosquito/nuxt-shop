<script setup lang="ts">
const hello = ref("Hello, Nuxt 4!");
</script>

<template>
  <div>
    {{ hello }}
    <SharedUsersTestComponent />
    <WidgetComponent />
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>
