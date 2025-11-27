<!-- components/DebugPanel.vue -->
<script setup lang="ts">
const route = useRoute();
const appConfig = useAppConfig();

// Отримання поточного стану
const debugInfo = computed(() => ({
  route: {
    path: route.path,
    params: route.params,
    query: route.query,
  },
  environment: {
    dev: import.meta.dev,
    ssr: import.meta.server,
    client: import.meta.client,
  },
  config: appConfig,
}));

const isExpanded = ref(false);
</script>

<template>
  <div
    class="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg shadow-lg max-w-md z-50"
    :class="{ 'w-96': isExpanded, 'w-auto': !isExpanded }"
  >
    <div class="flex items-center justify-between mb-2">
      <h3 class="font-bold">🐛 Debug Panel</h3>
      <button
        @click="isExpanded = !isExpanded"
        class="text-sm hover:text-gray-300"
      >
        {{ isExpanded ? "▼" : "▲" }}
      </button>
    </div>

    <div v-if="isExpanded" class="text-xs space-y-2">
      <div>
        <strong>Route:</strong>
        <pre class="bg-gray-800 p-2 rounded mt-1 overflow-auto">{{
          debugInfo.route
        }}</pre>
      </div>

      <div>
        <strong>Environment:</strong>
        <pre class="bg-gray-800 p-2 rounded mt-1">{{
          debugInfo.environment
        }}</pre>
      </div>

      <div>
        <strong>Config:</strong>
        <pre class="bg-gray-800 p-2 rounded mt-1 overflow-auto max-h-32">{{
          debugInfo.config
        }}</pre>
      </div>
    </div>
  </div>
</template>
