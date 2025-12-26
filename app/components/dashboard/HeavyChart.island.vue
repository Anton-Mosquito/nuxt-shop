<!-- components/HeavyChart.island.vue -->
<!-- Назва файлу має закінчуватись на .island.vue -->
<script setup lang="ts">
const props = defineProps<{
  data: number[];
  labels: string[];
}>();

// Тяжкі обчислення або велика бібліотека
import { Chart, registerables } from "chart.js";

const chartRef = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  if (!chartRef.value) return;

  Chart.register(...registerables);

  new Chart(chartRef.value, {
    type: "line",
    data: {
      labels: props.labels,
      datasets: [
        {
          label: "Статистика",
          data: props.data,
          borderColor: "rgb(59, 130, 246)",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
});
</script>

<template>
  <div class="w-full h-64 bg-white rounded-lg shadow p-4">
    <canvas ref="chartRef"></canvas>
  </div>
</template>
