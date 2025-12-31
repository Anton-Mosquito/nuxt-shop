<script setup lang="ts">
import type {
  Tab,
  TabId,
  TabsProps,
  TabsEmits,
} from "~/types/components/ui/tabs";

const {
  tabs,
  modelValue = undefined,
  defaultTab = undefined,
  lazy = false,
} = defineProps<TabsProps>();

const emit = defineEmits<TabsEmits>();

// Трекінг того, які таби вже були відвідані
const visitedTabs = ref<Set<TabId>>(
  new Set([modelValue || defaultTab || tabs[0]?.id].filter(Boolean) as TabId[])
);

// Internal active tab state
const internalActiveTab = ref<TabId>(
  modelValue || defaultTab || tabs[0]?.id || ""
);

// Computed for v-model support
const activeTab = computed({
  get: () => modelValue ?? internalActiveTab.value,
  set: (value: TabId) => {
    internalActiveTab.value = value;
    visitedTabs.value.add(value);
    emit("update:modelValue", value);
    emit("change", value);
    emit("tab-mounted", value);
  },
});

// Set active tab
const setActiveTab = (tabId: TabId) => {
  const tab = tabs.find((t) => t.id === tabId);
  if (tab && !tab.disabled) {
    activeTab.value = tabId;
  }
};

// Computed для відфільтрованих табів (для lazy режиму)
const renderedTabs = computed(() => {
  if (!lazy) return tabs; // Якщо не lazy mode - рендеримо всі таби
  return tabs.filter((tab) => visitedTabs.value.has(tab.id)); // Інакше тільки відвідані
});

// Keyboard navigation
const tabRefs = ref<HTMLButtonElement[]>([]);

const handleKeyDown = (event: KeyboardEvent, currentIndex: number) => {
  let newIndex = currentIndex;

  switch (event.key) {
    case "ArrowLeft":
      event.preventDefault();
      newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
      break;
    case "ArrowRight":
      event.preventDefault();
      newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
      break;
    case "Home":
      event.preventDefault();
      newIndex = 0;
      break;
    case "End":
      event.preventDefault();
      newIndex = tabs.length - 1;
      break;
    default:
      return;
  }

  // Skip disabled tabs
  while (tabs[newIndex]?.disabled) {
    if (event.key === "ArrowLeft" || event.key === "End") {
      newIndex = newIndex > 0 ? newIndex - 1 : tabs.length - 1;
    } else {
      newIndex = newIndex < tabs.length - 1 ? newIndex + 1 : 0;
    }
    // Prevent infinite loop if all tabs are disabled
    if (newIndex === currentIndex) break;
  }

  const targetTab = tabs[newIndex];
  if (targetTab && !targetTab.disabled) {
    setActiveTab(targetTab.id);
    tabRefs.value[newIndex]?.focus();
  }
};

// Watch for external modelValue changes
watch(
  () => modelValue,
  (newValue) => {
    if (newValue !== undefined) {
      internalActiveTab.value = newValue;
      visitedTabs.value.add(newValue);
    }
  }
);
</script>

<template>
  <div class="tabs">
    <div class="tabs-nav" role="tablist">
      <button
        v-for="(tab, index) in tabs"
        :key="tab.id"
        :ref="(el) => (tabRefs[index] = el as HTMLButtonElement)"
        class="tab-btn"
        :class="{ active: activeTab === tab.id, disabled: tab.disabled }"
        :disabled="tab.disabled"
        :aria-selected="activeTab === tab.id"
        :aria-controls="`panel-${tab.id}`"
        :tabindex="activeTab === tab.id ? 0 : -1"
        role="tab"
        @click="setActiveTab(tab.id)"
        @keydown="handleKeyDown($event, index)"
      >
        <Icon v-if="tab.icon" :name="tab.icon" size="18" class="tab-icon" />
        <span class="tab-label">{{ tab.label }}</span>
        <span v-if="tab.badge" class="tab-badge">{{ tab.badge }}</span>
      </button>
    </div>

    <div class="tabs-content">
      <div
        v-for="tab in renderedTabs"
        v-show="activeTab === tab.id"
        :id="`panel-${tab.id}`"
        :key="tab.id"
        :aria-labelledby="`tab-${tab.id}`"
        class="tab-panel"
        role="tabpanel"
      >
        <slot :name="tab.id" :tab="tab" :is-active="activeTab === tab.id" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.tabs {
  margin-top: 60px;
}

.tabs-nav {
  display: flex;
  gap: 8px;
  border-bottom: 1px solid var(--color-gray);
  margin-bottom: 32px;
}

.tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: var(--color-dark-gray);
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
  position: relative;
  top: 1px;
  white-space: nowrap;
}

.tab-btn:hover:not(.disabled) {
  color: var(--color-black);
}

.tab-btn:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: -2px;
  border-radius: 4px 4px 0 0;
}

.tab-btn.active {
  color: var(--color-black);
  border-bottom-color: var(--color-accent);
}

.tab-btn.disabled {
  cursor: not-allowed;
  opacity: 0.5;
  color: var(--color-gray);
}

.tab-icon {
  flex-shrink: 0;
}

.tab-label {
  flex: 1;
}

.tab-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background-color: var(--color-gray);
  color: var(--color-dark-gray);
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
}

.tab-btn.active .tab-badge {
  background-color: var(--color-accent);
  color: white;
}

.tab-panel {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .tabs-nav {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
  }

  .tab-btn {
    padding: 10px 16px;
    font-size: 14px;
  }
}
</style>
