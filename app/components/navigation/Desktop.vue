<script setup lang="ts">
import { HEADER_NAVIGATION } from "~/constants";
import type { NavigationStateProps, NavigationToggleEmit } from "~/types";

const { openDropdowns } = defineProps<NavigationStateProps>();
const emit = defineEmits<NavigationToggleEmit>();

const { isDropdownOpen, isParentActive } = useNavigationHelpers(openDropdowns);

const dropdownRefs = ref<Record<string, HTMLElement | null>>({});

useDropdownClickOutside(
  HEADER_NAVIGATION,
  dropdownRefs,
  isDropdownOpen,
  (label: string) => emit("toggle-dropdown", label)
);

const handleKeydown = (event: KeyboardEvent, itemLabel: string) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    emit("toggle-dropdown", itemLabel);
  } else if (event.key === "Escape" && isDropdownOpen(itemLabel)) {
    emit("toggle-dropdown", itemLabel);
  }
};
</script>

<template>
  <ul class="flex items-center gap-8" role="menubar">
    <li
      v-for="item in HEADER_NAVIGATION"
      :key="item.to"
      role="none"
      class="relative"
    >
      <NuxtLink
        v-if="!item.children"
        :to="item.to"
        :aria-label="item.ariaLabel"
        class="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-[#666] hover:text-black"
        active-class="text-black font-semibold"
        role="menuitem"
      >
        <span>{{ item.label }}</span>
      </NuxtLink>

      <div
        v-else
        :ref="(el) => dropdownRefs[item.label] = el as HTMLElement"
        class="relative"
      >
        <button
          type="button"
          :aria-label="item.ariaLabel"
          :aria-expanded="isDropdownOpen(item.label)"
          aria-haspopup
          :aria-controls="`dropdown-${item.label}`"
          class="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-[#666] hover:text-black cursor-pointer"
          :class="{ 'text-black font-semibold': isParentActive(item) }"
          role="menuitem"
          @click="emit('toggle-dropdown', item.label)"
          @keydown="handleKeydown($event, item.label)"
        >
          <span>{{ item.label }}</span>
          <Icon
            name="ic:baseline-keyboard-arrow-down"
            class="w-4 h-4 transition-transform"
            :class="{ 'rotate-180': isDropdownOpen(item.label) }"
            aria-hidden="true"
          />
        </button>

        <NavigationDropdown
          :item="item"
          :is-open="isDropdownOpen(item.label)"
          @close="emit('toggle-dropdown', item.label)"
        />
      </div>
    </li>
  </ul>
</template>
