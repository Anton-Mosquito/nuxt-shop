<script setup lang="ts">
const skipLinks = [
  { href: "#main-content", label: "Go to main content" },
  { href: "#navigation", label: "Go to navigation" },
  { href: "#footer", label: "Go to footer" },
];
</script>

<template>
  <div class="absolute top-0 left-0 z-50">
    <a
      v-for="link in skipLinks"
      :key="link.href"
      :href="link.href"
      class="absolute top-[-40px] left-0 bg-black text-white px-4 py-2 no-underline font-bold transition-all duration-300 focus:top-0"
    >
      {{ link.label }}
    </a>
  </div>
</template>
