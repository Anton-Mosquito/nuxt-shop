<script setup lang="ts">
import { HEADER_NAVIGATION } from "~/constants/header-navigation";

interface Props {
  openDropdowns: ReadonlySet<string>;
}

interface Emits {
  "toggle-dropdown": [itemLabel: string];
  "dropdown-keydown": [event: KeyboardEvent, itemLabel: string];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const route = useRoute();
const openDropdownsRef = toRef(props, "openDropdowns");
const { isDropdownOpen, isParentActive } =
  useNavigationHelpers(openDropdownsRef);

const dropdownRefs = ref<Record<string, HTMLElement | null>>({});

watchEffect(() => {
  HEADER_NAVIGATION.forEach((item) => {
    if (item.children && dropdownRefs.value[item.label]) {
      onClickOutside(dropdownRefs.value[item.label], () => {
        if (!isDropdownOpen(item.label)) return;

        emit("toggle-dropdown", item.label);
      });
    }
  });
});
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
        :aria-current="route.path === item.to ? 'page' : undefined"
        class="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-[#666] hover:text-black"
        :class="{ 'text-black font-semibold': route.path === item.to }"
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
          :aria-label="item.ariaLabel"
          :aria-expanded="isDropdownOpen(item.label)"
          aria-haspopup
          :aria-controls="`dropdown-${item.label}`"
          class="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-[#666] hover:text-black cursor-pointer"
          :class="{ 'text-black font-semibold': isParentActive(item) }"
          role="menuitem"
          @click="emit('toggle-dropdown', item.label)"
          @keydown="emit('dropdown-keydown', $event, item.label)"
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
