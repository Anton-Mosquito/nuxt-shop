<!-- pages/performance-demo.vue -->
<script setup lang="ts">
const images = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  src: `/images/demo${i + 1}.jpg`,
  alt: `Demo image ${i + 1}`,
}));

const showOptimized = ref(true);
const loadTimes = ref<{ optimized: number; regular: number }>({
  optimized: 0,
  regular: 0,
});

const startTime = ref(0);

onMounted(() => {
  startTime.value = performance.now();
});

function measureLoadTime(type: "optimized" | "regular") {
  const endTime = performance.now();
  loadTimes.value[type] = Math.round(endTime - startTime.value);
}
</script>

<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">Performance Demo</h1>

    <!-- Toggle -->
    <div class="mb-6 flex items-center gap-4">
      <button
        class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        @click="showOptimized = !showOptimized"
      >
        Показати: {{ showOptimized ? "Оптимізовані" : "Звичайні" }} зображення
      </button>

      <div v-if="loadTimes.optimized || loadTimes.regular" class="text-sm">
        <p v-if="loadTimes.optimized">
          Оптимізовані: <strong>{{ loadTimes.optimized }}ms</strong>
        </p>
        <p v-if="loadTimes.regular">
          Звичайні: <strong>{{ loadTimes.regular }}ms</strong>
        </p>
      </div>
    </div>

    <!-- Images Grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <template v-if="showOptimized">
        <div v-for="image in images" :key="`opt-${image.id}`">
          <NuxtImg
            :src="image.src"
            :alt="image.alt"
            width="300"
            height="300"
            format="webp"
            quality="80"
            loading="lazy"
            class="w-full h-48 object-cover rounded-lg"
            @load="image.id === images.length && measureLoadTime('optimized')"
          />
        </div>
      </template>

      <template v-else>
        <div v-for="image in images" :key="`reg-${image.id}`">
          <img
            :src="image.src"
            :alt="image.alt"
            loading="lazy"
            class="w-full h-48 object-cover rounded-lg"
            @load="image.id === images.length && measureLoadTime('regular')"
          />
        </div>
      </template>
    </div>

    <!-- Stats -->
    <div class="mt-8 p-6 bg-gray-100 rounded-lg">
      <h3 class="font-bold mb-4">Переваги NuxtImg:</h3>
      <ul class="space-y-2">
        <li class="flex items-center gap-2">
          <Icon
            name="heroicons-solid:check-circle"
            class="w-5 h-5 text-green-500"
            aria-hidden="true"
          />
          Автоматична конвертація в WebP
        </li>
        <li class="flex items-center gap-2">
          <Icon
            name="heroicons-solid:check-circle"
            class="w-5 h-5 text-green-500"
            aria-hidden="true"
          />
          Responsive зображення (sizes attribute)
        </li>
        <li class="flex items-center gap-2">
          <Icon
            name="heroicons-solid:check-circle"
            class="w-5 h-5 text-green-500"
            aria-hidden="true"
          />
          Lazy loading з placeholder
        </li>
        <li class="flex items-center gap-2">
          <Icon
            name="heroicons-solid:check-circle"
            class="w-5 h-5 text-green-500"
            aria-hidden="true"
          />
          Оптимізація розміру та якості
        </li>
      </ul>
    </div>
  </div>
</template>
