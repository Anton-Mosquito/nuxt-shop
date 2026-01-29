<script setup lang="ts">
const route = useRoute();
const appConfig = useAppConfig();
const { copy, copied } = useClipboard();

const debugInfo = computed(() => ({
  route: {
    path: route.path,
    name: route.name,
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
const activeSection = ref<string | null>("route");

const toggleSection = (section: string) => {
  activeSection.value = activeSection.value === section ? null : section;
};

const copyData = (data: unknown) => {
  copy(JSON.stringify(data, null, 2));
};
</script>

<template>
  <Teleport defer to="body">
    <div
      class="fixed bottom-4 right-4 z-[9999] font-mono text-xs transition-all duration-300"
      :class="[
        isExpanded ? 'w-96' : 'w-auto',
        'bg-gray-900 text-gray-200 rounded-lg shadow-2xl border border-gray-700',
      ]"
    >
      <!-- Header -->
      <div
        class="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-800 rounded-t-lg"
        @click="isExpanded = !isExpanded"
      >
        <div class="flex items-center gap-2">
          <span class="text-lg">🐛</span>
          <span v-if="isExpanded" class="font-bold text-white"
            >Debug Panel</span
          >
        </div>
        <button
          class="p-1 hover:bg-gray-700 rounded transition-colors"
          :aria-label="isExpanded ? 'Collapse' : 'Expand'"
        >
          <Icon
            :name="
              isExpanded
                ? 'ic:baseline-keyboard-arrow-down'
                : 'ic:baseline-keyboard-arrow-up'
            "
            class="w-5 h-5"
          />
        </button>
      </div>

      <div
        v-if="isExpanded"
        class="border-t border-gray-700 max-h-[80vh] overflow-y-auto"
      >
        <div
          v-for="(data, key) in debugInfo"
          :key="key"
          class="border-b border-gray-800 last:border-0"
        >
          <div
            class="flex items-center justify-between p-2 bg-gray-800/50 hover:bg-gray-800 cursor-pointer select-none"
            @click="toggleSection(key)"
          >
            <span class="capitalize font-semibold text-blue-400">{{
              key
            }}</span>
            <div class="flex items-center gap-2">
              <button
                class="p-1 hover:text-white text-gray-400 transition-colors"
                title="Copy JSON"
                @click.stop="copyData(data)"
              >
                <Icon
                  :name="
                    copied ? 'ic:baseline-check' : 'ic:baseline-content-copy'
                  "
                  class="w-4 h-4"
                />
              </button>
              <Icon
                :name="
                  activeSection === key
                    ? 'ic:baseline-remove'
                    : 'ic:baseline-add'
                "
                class="w-3 h-3 text-gray-500"
              />
            </div>
          </div>

          <div v-if="activeSection === key" class="p-2 bg-gray-900">
            <pre
              class="overflow-x-auto text-[10px] leading-4 text-green-400 custom-scrollbar"
              >{{ JSON.stringify(data, null, 2) }}</pre
            >
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #1f2937;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>
