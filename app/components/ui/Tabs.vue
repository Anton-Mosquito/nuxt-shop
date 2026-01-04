<script setup lang="ts">
import type { TabId, TabsProps } from "~/types";

const { tabs, defaultTab = undefined, lazy = false } = defineProps<TabsProps>();

const model = defineModel<TabId>({ required: false });

const visitedTabs = ref(new Set<TabId>());

onMounted(() => {
  if (!model.value) {
    model.value = defaultTab || tabs[0]?.id;
  }
  if (model.value) visitedTabs.value.add(model.value);
});

const setActiveTab = (tabId: TabId) => {
  const tab = tabs.find((t) => t.id === tabId);
  if (!tab || tab.disabled) return;

  model.value = tabId;
  visitedTabs.value.add(tabId);
};

const renderedTabs = computed(() => {
  if (!lazy) return tabs;

  return tabs.filter((tab) => visitedTabs.value.has(tab.id));
});

const tabButtonRefs = ref<Map<number, HTMLButtonElement>>(new Map());

const getNextIndex = (current: number, direction: 1 | -1): number => {
  let next = current + direction;
  const len = tabs.length;

  if (next < 0) next = len - 1;
  if (next >= len) next = 0;

  if (tabs[next]?.disabled) {
    if (next === current) return current;
    return getNextIndex(next, direction);
  }

  return next;
};

const handleKeyDown = (event: KeyboardEvent, index: number) => {
  const actions: Record<string, () => void> = {
    ArrowLeft: () => {
      const next = getNextIndex(index, -1);
      if (tabs[next]) {
        setActiveTab(tabs[next].id);
        tabButtonRefs.value.get(next)?.focus();
      }
    },
    ArrowRight: () => {
      const next = getNextIndex(index, 1);
      if (tabs[next]) {
        setActiveTab(tabs[next].id);
        tabButtonRefs.value.get(next)?.focus();
      }
    },
    Home: () => {
      const first = tabs.findIndex((t) => !t.disabled);
      if (first > -1) {
        const tab = tabs[first];
        if (tab) {
          setActiveTab(tab.id);
          tabButtonRefs.value.get(first)?.focus();
        }
      }
    },
    End: () => {
      const last = [...tabs].reverse().findIndex((t) => !t.disabled);
      const realIndex = last > -1 ? tabs.length - 1 - last : -1;
      if (realIndex > -1) {
        const tab = tabs[realIndex];
        if (tab) {
          setActiveTab(tab.id);
          tabButtonRefs.value.get(realIndex)?.focus();
        }
      }
    },
  };

  const action = actions[event.key];

  if (action) {
    event.preventDefault();
    action();
  }
};

watch(model, (val) => {
  if (!val) return;

  visitedTabs.value.add(val);
});
</script>

<template>
  <div class="mt-10">
    <div
      class="flex gap-2 border-b border-gray-200 mb-8 overflow-x-auto scrollbar-thin"
      role="tablist"
    >
      <button
        v-for="(tab, index) in tabs"
        :key="tab.id"
        :ref="
          (el) => {
            if (el) tabButtonRefs.set(index, el as HTMLButtonElement);
          }
        "
        type="button"
        class="group inline-flex items-center gap-2 px-6 py-3 text-base font-medium border-b-2 transition-all duration-200 whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded-t"
        :class="[
          model === tab.id
            ? 'border-primary text-gray-900'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
          tab.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        ]"
        :disabled="tab.disabled"
        :aria-selected="model === tab.id"
        :aria-controls="`panel-${tab.id}`"
        :tabindex="model === tab.id ? 0 : -1"
        role="tab"
        @click="setActiveTab(tab.id)"
        @keydown="handleKeyDown($event, index)"
      >
        <Icon v-if="tab.icon" :name="tab.icon" size="18" class="shrink-0" />

        <span>{{ tab.label }}</span>

        <span
          v-if="tab.badge"
          class="inline-flex items-center justify-center h-5 px-1.5 text-xs font-bold rounded-full transition-colors"
          :class="
            model === tab.id
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-600'
          "
        >
          {{ tab.badge }}
        </span>
      </button>
    </div>

    <div class="relative">
      <template v-for="tab in renderedTabs" :key="tab.id">
        <Transition
          enter-active-class="transition duration-300 ease-in"
          enter-from-class="opacity-0 translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
        >
          <div
            v-show="model === tab.id"
            :id="`panel-${tab.id}`"
            :aria-labelledby="`tab-${tab.id}`"
            role="tabpanel"
          >
            <slot :name="tab.id" :tab="tab" :is-active="model === tab.id" />
          </div>
        </Transition>
      </template>
    </div>
  </div>
</template>
