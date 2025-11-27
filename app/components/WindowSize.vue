<!-- components/WindowSize.vue -->
<script setup lang="ts">
// Компонент що відслідковує розмір вікна
// window не існує на сервері!

const width = ref(0);
const height = ref(0);

function updateSize() {
  // Guard: тільки на клієнті
  if (typeof window === "undefined") return;
  width.value = window.innerWidth;
  height.value = window.innerHeight;
}

onMounted(() => {
  if (typeof window !== "undefined") {
    updateSize();
    window.addEventListener("resize", updateSize);
  }
});

onUnmounted(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("resize", updateSize);
  }
});

// Визначення breakpoint
const breakpoint = computed(() => {
  if (width.value < 640) return "mobile";
  if (width.value < 1024) return "tablet";
  return "desktop";
});
</script>

<template>
  <div class="p-4 bg-blue-50 rounded">
    <h4 class="font-bold mb-2">Розмір вікна</h4>
    <p>Ширина: {{ width }}px</p>
    <p>Висота: {{ height }}px</p>
    <p class="mt-2">
      <span class="px-2 py-1 bg-blue-500 text-white rounded text-sm">
        {{ breakpoint }}
      </span>
    </p>
  </div>
</template>
