<script setup lang="ts">
const route = useRoute();

interface BreadcrumbItem {
  label: string;
  to: string;
}

// Маппінг шляхів до читабельних назв
const pathLabels: Record<string, string> = {
  "": "Головна",
  dashboard: "Dashboard",
  users: "Користувачі",
  products: "Продукти",
  orders: "Замовлення",
  analytics: "Аналітика",
  settings: "Налаштування",
  new: "Створити",
  edit: "Редагувати",
  categories: "Категорії",
  inventory: "Інвентар",
  general: "Загальні",
  security: "Безпека",
  notifications: "Сповіщення",
  integrations: "Інтеграції",
};

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  const paths = route.path.split("/").filter(Boolean);
  const items: BreadcrumbItem[] = [];

  let currentPath = "";

  // Додаємо Home якщо не на головній
  if (paths.length > 0) {
    items.push({ label: "Головна", to: "/" });
  }

  paths.forEach((path) => {
    currentPath += `/${path}`;

    // Пропускаємо динамічні параметри (id)
    if (!isNaN(Number(path))) {
      // Можна додати логіку для отримання назви з API
      items.push({
        label: `#${path}`,
        to: currentPath,
      });
    } else {
      items.push({
        label: pathLabels[path] || path,
        to: currentPath,
      });
    }
  });

  return items;
});
</script>

<template>
  <nav
    class="flex items-center gap-2 text-sm text-gray-600 mb-6"
    aria-label="Breadcrumb"
  >
    <template v-for="(item, index) in breadcrumbs" :key="item.to">
      <!-- Separator -->
      <Icon
        v-if="index > 0"
        name="heroicons-outline:chevron-right"
        class="w-4 h-4 text-gray-400"
        aria-hidden="true"
      />

      <!-- Last item (current page) -->
      <span
        v-if="index === breadcrumbs.length - 1"
        class="font-medium text-gray-900"
        aria-current="page"
      >
        {{ item.label }}
      </span>

      <!-- Link -->
      <NuxtLink
        v-else
        :to="item.to"
        class="hover:text-blue-600 transition-colors"
      >
        {{ item.label }}
      </NuxtLink>
    </template>
  </nav>
</template>
