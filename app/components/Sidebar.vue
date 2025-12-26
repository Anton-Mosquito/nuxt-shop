<script setup lang="ts">
interface SidebarItem {
  label: string;
  to: string;
  icon: string;
  badge?: string;
  children?: SidebarItem[];
}

const sidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: "📊",
  },
  {
    label: "Користувачі",
    to: "/dashboard/users",
    icon: "👥",
    children: [
      { label: "Всі користувачі", to: "/dashboard/users", icon: "📋" },
      { label: "Додати користувача", to: "/dashboard/users/new", icon: "➕" },
      { label: "Ролі та дозволи", to: "/dashboard/users/roles", icon: "🔐" },
    ],
  },
  {
    label: "Продукти",
    to: "/dashboard/products",
    icon: "📦",
    children: [
      { label: "Каталог", to: "/dashboard/products", icon: "📋" },
      { label: "Додати продукт", to: "/dashboard/products/new", icon: "➕" },
      { label: "Категорії", to: "/dashboard/products/categories", icon: "📁" },
      { label: "Інвентар", to: "/dashboard/products/inventory", icon: "📊" },
    ],
  },
  {
    label: "Замовлення",
    to: "/dashboard/orders",
    icon: "🛒",
    badge: "12",
  },
  {
    label: "Аналітика",
    to: "/dashboard/analytics",
    icon: "📈",
  },
  {
    label: "Налаштування",
    to: "/dashboard/settings",
    icon: "⚙️",
    children: [
      { label: "Загальні", to: "/dashboard/settings/general", icon: "🔧" },
      { label: "Безпека", to: "/dashboard/settings/security", icon: "🔒" },
      {
        label: "Сповіщення",
        to: "/dashboard/settings/notifications",
        icon: "🔔",
      },
      {
        label: "Інтеграції",
        to: "/dashboard/settings/integrations",
        icon: "🔌",
      },
    ],
  },
];

const route = useRoute();
const expandedItems = ref<string[]>([]);

// Автоматично розгортати active parent
watchEffect(() => {
  sidebarItems.forEach((item) => {
    if (item.children && isParentActive(item)) {
      if (!expandedItems.value.includes(item.to)) {
        expandedItems.value.push(item.to);
      }
    }
  });
});

function isParentActive(item: SidebarItem): boolean {
  if (!item.children) return false;
  return item.children.some(
    (child) => route.path === child.to || route.path.startsWith(child.to + "/")
  );
}

function toggleExpand(itemTo: string) {
  const index = expandedItems.value.indexOf(itemTo);
  if (index > -1) {
    expandedItems.value.splice(index, 1);
  } else {
    expandedItems.value.push(itemTo);
  }
}

function isExpanded(itemTo: string): boolean {
  return expandedItems.value.includes(itemTo);
}
</script>

<template>
  <aside
    class="w-64 bg-gray-900 text-white h-screen sticky top-0 overflow-y-auto"
  >
    <!-- Header -->
    <div class="p-4 border-b border-gray-800">
      <NuxtLink
        to="/dashboard"
        class="flex items-center gap-3 text-xl font-bold hover:text-blue-400 transition-colors"
      >
        <span class="text-2xl">🚀</span>
        <span>Admin Panel</span>
      </NuxtLink>
    </div>

    <!-- Navigation -->
    <nav class="p-4 space-y-1">
      <div v-for="item in sidebarItems" :key="item.to">
        <!-- Item without children -->
        <NuxtLink
          v-if="!item.children"
          :to="item.to"
          class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors group"
          active-class="bg-blue-600 text-white"
          exact-active-class="font-semibold"
        >
          <span class="text-xl">{{ item.icon }}</span>
          <span class="flex-1">{{ item.label }}</span>
          <span
            v-if="item.badge"
            class="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full"
          >
            {{ item.badge }}
          </span>
        </NuxtLink>

        <!-- Item with children -->
        <div v-else>
          <!-- Parent button -->
          <button
            class="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            :class="{
              'bg-gray-800': isParentActive(item) || isExpanded(item.to),
            }"
            @click="toggleExpand(item.to)"
          >
            <span class="text-xl">{{ item.icon }}</span>
            <span class="flex-1 text-left">{{ item.label }}</span>
            <svg
              class="w-4 h-4 transition-transform"
              :class="{ 'rotate-180': isExpanded(item.to) }"
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

          <!-- Children -->
          <div
            v-show="isExpanded(item.to)"
            class="ml-6 mt-1 space-y-1 border-l-2 border-gray-700 pl-4"
          >
            <NuxtLink
              v-for="child in item.children"
              :key="child.to"
              :to="child.to"
              class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors"
              active-class="bg-blue-600 text-white font-medium"
              exact-active-class="font-semibold"
            >
              <span>{{ child.icon }}</span>
              <span>{{ child.label }}</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Footer -->
    <div class="p-4 border-t border-gray-800 mt-auto">
      <div class="flex items-center gap-3 px-4 py-3">
        <UserAvatar src="/images/admin-avatar.jpg" alt="Admin" size="sm" />
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium truncate">Олена Петренко</p>
          <p class="text-xs text-gray-400 truncate">admin@example.com</p>
        </div>
      </div>
    </div>
  </aside>
</template>
