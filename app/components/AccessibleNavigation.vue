<!-- components/AccessibleNavigation.vue -->
<script setup lang="ts">
interface NavItem {
  label: string;
  to: string;
  icon?: string;
  ariaLabel?: string;
}

const navigation: NavItem[] = [
  {
    label: "Головна",
    to: "/",
    icon: "heroicons-solid:home",
    ariaLabel: "Перейти на головну сторінку",
  },
  {
    label: "Продукти",
    to: "/products",
    icon: "heroicons-outline:shopping-bag",
    ariaLabel: "Переглянути каталог продуктів",
  },
  {
    label: "Про нас",
    to: "/about",
    icon: "heroicons-outline:information-circle",
    ariaLabel: "Дізнатись більше про компанію",
  },
  {
    label: "Контакти",
    to: "/contact",
    icon: "heroicons-outline:envelope",
    ariaLabel: "Зв'язатись з нами",
  },
];

const route = useRoute();
const mobileMenuOpen = ref(false);

// Оголошення для screen readers
const routeTitle = computed(() => {
  return route.meta.title || "Сторінка";
});
</script>

<template>
  <nav class="bg-white shadow" role="navigation" aria-label="Головна навігація">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink
          to="/"
          class="text-2xl font-bold flex items-center gap-2"
          aria-label="MyApp - повернутись на головну"
        >
          <Icon
            name="heroicons-outline:rocket-launch"
            class="w-6 h-6"
            aria-hidden="true"
          />
          <span>MyApp</span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <ul class="hidden md:flex items-center gap-1" role="menubar">
          <li v-for="item in navigation" :key="item.to" role="none">
            <NuxtLink
              :to="item.to"
              :aria-label="item.ariaLabel"
              :aria-current="route.path === item.to ? 'page' : undefined"
              class="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              active-class="bg-blue-50 text-blue-600 font-semibold"
              role="menuitem"
            >
              <span aria-hidden="true">
                <Icon :name="item.icon" class="w-5 h-5" aria-hidden="true" />
              </span>
              <span>{{ item.label }}</span>
            </NuxtLink>
          </li>
        </ul>

        <!-- Mobile menu button -->
        <button
          class="md:hidden p-2"
          :aria-expanded="mobileMenuOpen"
          aria-controls="mobile-menu"
          aria-label="Відкрити меню навігації"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <Icon
            v-if="!mobileMenuOpen"
            name="heroicons-outline:bars-3"
            class="w-6 h-6"
            aria-hidden="true"
          />
          <Icon
            v-else
            name="heroicons-outline:x-mark"
            class="w-6 h-6"
            aria-hidden="true"
          />
        </button>
      </div>

      <!-- Mobile Navigation -->
      <div
        v-if="mobileMenuOpen"
        id="mobile-menu"
        class="md:hidden pb-4"
        role="menu"
      >
        <NuxtLink
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          :aria-label="item.ariaLabel"
          :aria-current="route.path === item.to ? 'page' : undefined"
          class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
          active-class="bg-blue-50 text-blue-600 font-semibold"
          role="menuitem"
          @click="mobileMenuOpen = false"
        >
          <span aria-hidden="true">
            <Icon :name="item.icon" class="w-5 h-5" aria-hidden="true" />
          </span>
          <span>{{ item.label }}</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Screen reader announcement для поточної сторінки -->
    <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
      Поточна сторінка: {{ routeTitle }}
    </div>
  </nav>
</template>

<style scoped>
/* Screen reader only class */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
