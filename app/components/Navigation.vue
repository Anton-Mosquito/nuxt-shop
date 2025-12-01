<script setup lang="ts">
interface NavItem {
  label: string;
  to: string;
  icon?: string;
  badge?: string | number;
  children?: NavItem[];
}

const navigation: NavItem[] = [
  {
    label: "Головна",
    to: "/",
    icon: "home",
  },
  {
    label: "Продукти",
    to: "/products",
    icon: "shopping-bag",
    children: [
      { label: "Електроніка", to: "/products/electronics" },
      { label: "Одяг", to: "/products/clothing" },
      { label: "Книги", to: "/products/books" },
    ],
  },
  {
    label: "Блог",
    to: "/blog",
    icon: "newspaper",
    badge: "3", // нові статті
  },
  {
    label: "Про нас",
    to: "/about",
    icon: "info",
  },
  {
    label: "Контакти",
    to: "/contact",
    icon: "mail",
  },
];

const route = useRoute();
const mobileMenuOpen = ref(false);

// Перевірка чи активний parent item
function isParentActive(item: NavItem): boolean {
  if (!item.children) return false;
  return item.children.some((child) => route.path.startsWith(child.to));
}

// Іконки (можна замінити на lucide-vue або інші)
const icons: Record<string, string> = {
  home: "🏠",
  "shopping-bag": "🛍️",
  newspaper: "📰",
  info: "ℹ️",
  mail: "✉️",
};
</script>

<template>
  <nav class="bg-white shadow-lg sticky top-0 z-40">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink
          to="/"
          class="flex items-center gap-2 text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
          :prefetch="false"
        >
          <span>🚀</span>
          <span>MyApp</span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-1">
          <template v-for="item in navigation" :key="item.to">
            <!-- Simple link without children -->
            <NuxtLink
              v-if="!item.children"
              :to="item.to"
              class="relative px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all"
              active-class="text-blue-600 bg-blue-50"
              exact-active-class="font-semibold"
            >
              <span class="flex items-center gap-2">
                <span>{{ icons[item.icon || ""] }}</span>
                <span>{{ item.label }}</span>
                <span
                  v-if="item.badge"
                  class="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full"
                >
                  {{ item.badge }}
                </span>
              </span>
            </NuxtLink>

            <!-- Dropdown with children -->
            <div v-else class="relative group">
              <button
                class="px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center gap-2"
                :class="{
                  'text-blue-600 bg-blue-50 font-semibold':
                    isParentActive(item),
                }"
              >
                <span>{{ icons[item.icon || ""] }}</span>
                <span>{{ item.label }}</span>
                <svg
                  class="w-4 h-4 transition-transform group-hover:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <!-- Dropdown menu -->
              <div
                class="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all"
              >
                <div class="py-2">
                  <NuxtLink
                    v-for="child in item.children"
                    :key="child.to"
                    :to="child.to"
                    class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    active-class="bg-blue-50 text-blue-600 font-medium"
                  >
                    {{ child.label }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- Mobile menu button -->
        <button
          class="md:hidden p-2 rounded-lg hover:bg-gray-100"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              v-if="!mobileMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="mobileMenuOpen" class="md:hidden pb-4">
        <div class="space-y-1">
          <template v-for="item in navigation" :key="item.to">
            <NuxtLink
              v-if="!item.children"
              :to="item.to"
              class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              active-class="bg-blue-50 text-blue-600 font-semibold"
              @click="mobileMenuOpen = false"
            >
              <span>{{ icons[item.icon || ""] }}</span>
              <span>{{ item.label }}</span>
              <span
                v-if="item.badge"
                class="ml-auto px-2 py-0.5 bg-red-500 text-white text-xs rounded-full"
              >
                {{ item.badge }}
              </span>
            </NuxtLink>

            <div v-else>
              <div class="px-4 py-3 text-gray-500 text-sm font-medium">
                {{ item.label }}
              </div>
              <div class="pl-8 space-y-1">
                <NuxtLink
                  v-for="child in item.children"
                  :key="child.to"
                  :to="child.to"
                  class="block px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  active-class="bg-blue-50 text-blue-600 font-medium"
                  @click="mobileMenuOpen = false"
                >
                  {{ child.label }}
                </NuxtLink>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>
