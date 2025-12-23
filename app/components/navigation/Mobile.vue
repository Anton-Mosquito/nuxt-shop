<script setup lang="ts">
import { HEADER_NAVIGATION } from "~/constants/header-navigation";
import type { NavItem } from "~/types/ui/navigation";

interface Props {
  isOpen: boolean;
  openDropdowns: ReadonlySet<string>;
  iconNavigation: NavItem[];
}

interface Emits {
  logout: [];
  close: [];
  "toggle-dropdown": [itemLabel: string];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const route = useRoute();
const openDropdownsRef = toRef(props, "openDropdowns");
const { isAuthenticated, isDropdownOpen, isParentActive } =
  useNavigationHelpers(openDropdownsRef);
</script>

<template>
  <div
    v-if="isOpen"
    id="mobile-menu"
    class="md:hidden pb-4 animate-slideDown"
    role="menu"
  >
    <ul class="space-y-1" role="none">
      <li v-for="item in HEADER_NAVIGATION" :key="item.to" role="none">
        <NuxtLink
          v-if="!item.children"
          :to="item.to"
          :aria-label="item.ariaLabel"
          :aria-current="route.path === item.to ? 'page' : undefined"
          class="flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors text-[#666] hover:bg-gray-50 hover:text-black"
          :class="{
            'bg-gray-50 text-black font-semibold': route.path === item.to,
          }"
          role="menuitem"
          @click="emit('close')"
        >
          <Icon
            v-if="item.icon"
            :name="item.icon"
            size="20"
            aria-hidden="true"
          />
          <span>{{ item.label }}</span>
        </NuxtLink>

        <!-- Dropdown in mobile -->
        <div v-else>
          <button
            :aria-label="item.ariaLabel"
            :aria-expanded="isDropdownOpen(item.label)"
            :aria-controls="`mobile-dropdown-${item.label}`"
            class="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors text-[#666] hover:bg-gray-50 hover:text-black"
            :class="{
              'bg-gray-50 text-black font-semibold': isParentActive(item),
            }"
            @click="emit('toggle-dropdown', item.label)"
          >
            <span class="flex items-center gap-3">
              <Icon
                v-if="item.icon"
                :name="item.icon"
                size="20"
                aria-hidden="true"
              />
              <span>{{ item.label }}</span>
            </span>
            <Icon
              name="ic:baseline-keyboard-arrow-down"
              class="w-4 h-4 transition-transform"
              :class="{ 'rotate-180': isDropdownOpen(item.label) }"
              aria-hidden="true"
            />
          </button>

          <!-- Mobile submenu -->
          <NavigationDropdown
            :item="item"
            :is-open="isDropdownOpen(item.label)"
            is-mobile
            @close="emit('close')"
          />
        </div>
      </li>

      <!-- Divider -->
      <li class="border-t border-gray-200 my-2" aria-hidden="true"></li>

      <!-- Icon items in mobile -->
      <li v-for="item in iconNavigation" :key="item.to" role="none">
        <!-- Simple icon link -->
        <NuxtLink
          v-if="!item.children"
          :to="item.to"
          :aria-label="item.ariaLabel"
          :aria-current="route.path === item.to ? 'page' : undefined"
          class="flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors text-[#666] hover:bg-gray-50 hover:text-black"
          :class="{
            'bg-gray-50 text-black font-semibold': route.path === item.to,
          }"
          role="menuitem"
          @click="emit('close')"
        >
          <span class="flex items-center gap-3">
            <Icon :name="item.icon || ''" size="20" aria-hidden="true" />
            <span>{{ item.label }}</span>
          </span>
          <span
            v-if="
              item.badge && typeof item.badge === 'number' && item.badge > 0
            "
            class="px-1.5 py-0.5 bg-red-500 text-white text-[0.625rem] leading-none rounded-full min-w-[1.25rem] text-center"
            :aria-label="`${item.badge} items`"
          >
            {{ item.badge }}
          </span>
        </NuxtLink>

        <!-- Account dropdown in mobile -->
        <div v-else>
          <NuxtLink
            v-if="!isAuthenticated"
            to="/auth/login"
            :aria-label="item.ariaLabel"
            class="flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors text-[#666] hover:bg-gray-50 hover:text-black"
            role="menuitem"
            @click="emit('close')"
          >
            <Icon :name="item.icon || ''" size="20" aria-hidden="true" />
            <span>{{ item.label }}</span>
          </NuxtLink>
          <div v-else>
            <button
              :aria-label="item.ariaLabel"
              :aria-expanded="isDropdownOpen(item.label)"
              :aria-controls="`mobile-dropdown-${item.label}`"
              class="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors text-[#666] hover:bg-gray-50 hover:text-black"
              :class="{
                'bg-gray-50 text-black font-semibold': isParentActive(item),
              }"
              @click="emit('toggle-dropdown', item.label)"
            >
              <span class="flex items-center gap-3">
                <Icon :name="item.icon || ''" size="20" aria-hidden="true" />
                <span>{{ item.label }}</span>
              </span>
              <Icon
                name="ic:baseline-keyboard-arrow-down"
                class="w-4 h-4 transition-transform"
                :class="{ 'rotate-180': isDropdownOpen(item.label) }"
                aria-hidden="true"
              />
            </button>

            <!-- Mobile account submenu -->
            <NavigationDropdown
              :item="item"
              :is-open="isDropdownOpen(item.label)"
              is-mobile
              :filter-labels="['Logout']"
              @close="emit('close')"
            >
              <template #extra-items-mobile>
                <button
                  class="w-full text-left flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-[#666] hover:bg-gray-50 hover:text-black"
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
              </template>
            </NavigationDropdown>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
