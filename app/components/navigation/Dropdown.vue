<script setup lang="ts">
import type { NavItem } from "~/types/ui/navigation";
import { isString } from "~/types/utils";

interface Props {
  item: NavItem;
  isOpen: boolean;
  isMobile?: boolean;
  align?: "left" | "right";
  filterLabels?: string[];
}

interface Emits {
  close: [];
}

const {
  item,
  isOpen,
  isMobile = false,
  align = "left",
  filterLabels = [],
} = defineProps<Props>();
const emit = defineEmits<Emits>();
const route = useRoute();

const navigationItems = computed(() => {
  const children = item.children ?? [];
  return filterLabels.length
    ? children.filter(({ label }) => !filterLabels.includes(label))
    : children;
});

const dropdownClasses = computed(() => {
  if (isMobile) return "pl-8 mt-1 space-y-1";

  const alignment = align === "right" ? "right-0" : "left-0";
  return [
    "absolute top-full",
    alignment,
    "mt-2 w-56 bg-white rounded-lg shadow-xl",
    "transition-all border border-[#e5e5e5] animate-slideDown",
  ].join(" ");
});

const itemClasses = computed(() =>
  [
    "flex items-center gap-2 px-4 py-2 transition-colors text-[#666]",
    "hover:bg-gray-50 hover:text-black",
    isMobile && "rounded-lg",
  ]
    .filter(Boolean)
    .join(" ")
);

const isChildActive = (child: NavItem) => route.fullPath === child.to;
</script>

<template>
  <div
    v-if="isOpen"
    :id="`dropdown-${item.label}`"
    :class="dropdownClasses"
    role="menu"
    :aria-label="`${item.label} submenu`"
  >
    <ul v-if="!isMobile" class="py-2" role="none">
      <li v-for="child in navigationItems" :key="child.to" role="none">
        <NuxtLink
          :to="child.to"
          :aria-label="child.ariaLabel"
          :aria-current="isChildActive(child) ? 'page' : undefined"
          :class="[
            itemClasses,
            { 'bg-gray-50 text-black font-medium': isChildActive(child) },
          ]"
          role="menuitem"
          @click="emit('close')"
        >
          <Icon
            v-if="isString(child.icon)"
            :name="child.icon"
            class="w-4 h-4"
            aria-hidden="true"
          />
          <span>{{ child.label }}</span>
        </NuxtLink>
      </li>
      <slot name="extra-items" />
    </ul>

    <template v-else>
      <NuxtLink
        v-for="child in navigationItems"
        :key="child.to"
        :to="child.to"
        :aria-label="child.ariaLabel"
        :aria-current="isChildActive(child) ? 'page' : undefined"
        :class="[
          itemClasses,
          { 'bg-gray-50 text-black font-medium': isChildActive(child) },
        ]"
        role="menuitem"
        @click="emit('close')"
      >
        <Icon
          v-if="isString(child.icon)"
          :name="child.icon"
          class="w-4 h-4"
          aria-hidden="true"
        />
        <span>{{ child.label }}</span>
      </NuxtLink>
      <slot name="extra-items-mobile" />
    </template>
  </div>
</template>

<style scoped>
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slideDown {
  animation: slideDown 0.2s ease-out;
}
</style>
