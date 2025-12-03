<!-- components/SkipToContent.vue -->
<script setup lang="ts">
const skipLinks = [
  { href: "#main-content", label: "Перейти до основного контенту" },
  { href: "#navigation", label: "Перейти до навігації" },
  { href: "#footer", label: "Перейти до футеру" },
];
</script>

<template>
  <div class="skip-links">
    <a
      v-for="link in skipLinks"
      :key="link.href"
      :href="link.href"
      class="skip-link"
    >
      {{ link.label }}
    </a>
  </div>
</template>

<style scoped>
.skip-links {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
}

.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  font-weight: bold;
  transition: top 0.3s;
}

.skip-link:focus {
  top: 0;
}
</style>
