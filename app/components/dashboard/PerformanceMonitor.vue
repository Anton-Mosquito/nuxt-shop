<script setup lang="ts">
// Моніторинг продуктивності сторінки
const metrics = ref({
  loadTime: 0,
  renderTime: 0,
  memoryUsage: 0,
});

onMounted(() => {
  // Час завантаження
  const navigation = performance.getEntriesByType(
    "navigation"
  )[0] as PerformanceNavigationTiming;
  metrics.value.loadTime = Math.round(
    navigation.loadEventEnd - navigation.fetchStart
  );

  // Час рендерингу
  const paint = performance.getEntriesByType("paint");
  const fcp = paint.find((entry) => entry.name === "first-contentful-paint");
  if (fcp) {
    metrics.value.renderTime = Math.round(fcp.startTime);
  }

  // Використання пам'яті (якщо доступно)
  if (!("memory" in performance)) {
    return;
  }

  interface PerformanceMemory {
    usedJSHeapSize?: number;
    totalJSHeapSize?: number;
    jsHeapSizeLimit?: number;
  }

  const perfWithMemory = performance as unknown as {
    memory?: PerformanceMemory;
  };
  const memory = perfWithMemory.memory;

  if (memory?.usedJSHeapSize != null) {
    metrics.value.memoryUsage = Math.round(memory.usedJSHeapSize / 1_048_576); // MB
  }
});

const getColorClass = (value: number, threshold: number) => {
  return value < threshold ? "text-green-400" : "text-red-400";
};
</script>

<template>
  <div
    class="fixed bottom-20 left-4 bg-gray-900 text-white p-3 rounded-lg shadow-lg text-xs"
  >
    <h4 class="font-bold mb-2">⚡ Performance</h4>
    <div class="space-y-1">
      <div :class="getColorClass(metrics.loadTime, 3000)">
        Load: {{ metrics.loadTime }}ms
      </div>
      <div :class="getColorClass(metrics.renderTime, 1000)">
        FCP: {{ metrics.renderTime }}ms
      </div>
      <div v-if="metrics.memoryUsage">Memory: {{ metrics.memoryUsage }}MB</div>
    </div>
  </div>
</template>
