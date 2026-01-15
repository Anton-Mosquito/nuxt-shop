<script setup lang="ts">
import { BREADCRUMB_LABELS } from "~/constants";

const route = useRoute();
const router = useRouter();

interface BreadcrumbItem {
  label: string;
  to: string;
}

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  const paths = route.path.split("/").filter(Boolean);
  const items: BreadcrumbItem[] = [];

  if (paths.length > 0) {
    items.push({ label: BREADCRUMB_LABELS[""] || "Головна", to: "/" });
  }

  let currentPath = "";

  paths.forEach((path) => {
    currentPath += `/${path}`;
    let label = "";

    try {
      const resolved = router.resolve(currentPath);
      if (resolved?.meta?.title) {
        label = String(resolved.meta.title);
      }
    } catch (e: unknown) {
      console.warn("Breadcrumb resolve error:", e);
    }

    if (!label) {
      label = BREADCRUMB_LABELS[path] ?? "";
    }

    if (!label) {
      const isNumeric = !isNaN(Number(path));
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}/.test(path);

      label =
        isNumeric || isUuid
          ? `#${path}`
          : path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");
    }

    items.push({
      label,
      to: currentPath,
    });
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
        name="ic:baseline-chevron-right"
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
