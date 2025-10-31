<script setup lang="ts">
import type { LayoutKey } from "#build/types/layouts";
import "~/assets/styles/main.css";

const name = ref<LayoutKey>("auth");
</script>

<template>
  <div>
    <NuxtLayout :name="name">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style lang="css" scoped>
div {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
