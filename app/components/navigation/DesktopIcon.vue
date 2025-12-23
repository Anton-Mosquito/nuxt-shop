<script setup lang="ts">
import type { NavItem } from "~/types/ui/navigation";

interface Props {
  openDropdowns: ReadonlySet<string>;
  iconNavigation: NavItem[];
}

interface Emits {
  "toggle-dropdown": [itemLabel: string];
  "dropdown-keydown": [event: KeyboardEvent, itemLabel: string];
  logout: [];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const route = useRoute();
const openDropdownsRef = toRef(props, "openDropdowns");
const { isAuthenticated, isDropdownOpen, isParentActive } =
  useNavigationHelpers(openDropdownsRef);

const dropdownRefs = ref<Record<string, HTMLElement | null>>({});

watchEffect(() => {
  props.iconNavigation.forEach((item) => {
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
  <ul class="flex items-center gap-6" role="menubar">
    <li
      v-for="item in iconNavigation"
      :key="item.to"
      role="none"
      class="relative"
    >
      <NuxtLink
        v-if="!item.children"
        :to="item.to"
        :aria-label="item.ariaLabel"
        :aria-current="route.path === item.to ? 'page' : undefined"
        class="flex items-center justify-center transition-colors relative text-[#666] hover:text-black"
        :class="{ 'text-black': route.path === item.to }"
        role="menuitem"
        :prefetch="['/cart', '/favorites'].includes(item.to)"
      >
        <Icon :name="item.icon || ''" size="21" aria-hidden="true" />
        <span
          v-if="item.badge && typeof item.badge === 'number' && item.badge > 0"
          class="absolute -top-2 -right-2 px-1.5 py-0.5 bg-red-500 text-white text-[0.625rem] leading-none rounded-full min-w-[1.25rem] text-center"
          :aria-label="`${item.badge} items`"
        >
          {{ item.badge }}
        </span>
      </NuxtLink>

      <div
        v-else
        :ref="(el) => dropdownRefs[item.label] = el as HTMLElement"
        class="relative"
      >
        <button
          v-if="isAuthenticated"
          :aria-label="item.ariaLabel"
          :aria-expanded="isDropdownOpen(item.label)"
          :aria-haspopup="true"
          :aria-controls="`dropdown-${item.label}`"
          class="flex items-center justify-center transition-colors relative text-[#666] hover:text-black cursor-pointer"
          :class="{ 'text-black': isParentActive(item) }"
          role="menuitem"
          @click="emit('toggle-dropdown', item.label)"
          @keydown="emit('dropdown-keydown', $event, item.label)"
        >
          <Icon :name="item.icon || ''" size="21" aria-hidden="true" />
        </button>
        <NuxtLink
          v-else
          to="/auth/login"
          :aria-label="item.ariaLabel"
          class="flex items-center justify-center transition-colors relative text-[#666] hover:text-black"
          role="menuitem"
        >
          <Icon :name="item.icon || ''" size="21" aria-hidden="true" />
        </NuxtLink>

        <NavigationDropdown
          v-if="isAuthenticated"
          :item="item"
          :is-open="isDropdownOpen(item.label)"
          :filter-labels="['Logout']"
          align="right"
          @close="emit('toggle-dropdown', item.label)"
        >
          <template #extra-items>
            <li role="none">
              <button
                class="w-full text-left flex items-center gap-2 px-4 py-2 transition-colors text-[#666] hover:bg-gray-50 hover:text-black"
                role="menuitem"
                @click="emit('logout')"
              >
                <Icon
                  name="ic:outline-logout"
                  class="w-4 h-4"
                  aria-hidden="true"
                />
                <span>Logout</span>
              </button>
            </li>
          </template>
        </NavigationDropdown>
      </div>
    </li>
  </ul>
</template>
