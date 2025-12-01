<script setup lang="ts">
//import type { LayoutKey } from "#build/types/layouts";
import "~/assets/styles/main.css";

//const name = ref<LayoutKey>("auth");
</script>

<template>
  <div>
    <NuxtLayout>
      <main class="main">
        <NuxtPage :transition="{ name: 'page', mode: 'out-in' }" />
      </main>
    </NuxtLayout>
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
</style>
