<script setup lang="ts">
const { currentPage, totalPages, baseUrl } = defineProps<{
  currentPage: number;
  totalPages: number;
  baseUrl: string; // '/products' або '/blog'
}>();

const emit = defineEmits<{
  pageChange: [page: number];
}>();

const route = useRoute();

// Генерація масиву сторінок для відображення
const visiblePages = computed(() => {
  const pages: (number | string)[] = [];
  const delta = 2; // скільки сторінок показувати з кожного боку

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return pages;
});

function getPageUrl(page: number): string {
  const query = { ...route.query, page: String(page) };
  return `${baseUrl}?${new URLSearchParams(query as any).toString()}`;
}

const isPrevDisabled = computed(() => currentPage <= 1);
const isNextDisabled = computed(() => currentPage >= totalPages);
const shouldPrefetchPage = (page: number) => Math.abs(page - currentPage) <= 1;
</script>

<template>
  <nav class="flex items-center justify-center gap-2" aria-label="Pagination">
    <!-- Previous -->
    <NuxtLink
      v-if="!isPrevDisabled"
      :to="getPageUrl(currentPage - 1)"
      class="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
      prefetch
      @click="emit('pageChange', currentPage - 1)"
    >
      <Icon
        name="heroicons-outline:chevron-left"
        class="w-5 h-5"
        aria-hidden="true"
      />
    </NuxtLink>
    <button
      v-else
      disabled
      class="px-3 py-2 rounded-lg border border-gray-200 text-gray-400 cursor-not-allowed"
    >
      <Icon
        name="heroicons-outline:chevron-left"
        class="w-5 h-5"
        aria-hidden="true"
      />
    </button>

    <!-- Page numbers -->
    <template v-for="(page, index) in visiblePages" :key="index">
      <!-- Ellipsis -->
      <span v-if="page === '...'" class="px-4 py-2 text-gray-500"> ... </span>

      <!-- Current page -->
      <span
        v-else-if="page === currentPage"
        class="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold"
        aria-current="page"
      >
        {{ page }}
      </span>

      <!-- Other pages -->
      <NuxtLink
        v-else
        :to="getPageUrl(page as number)"
        class="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
        :prefetch="shouldPrefetchPage(page as number)"
        @click="emit('pageChange', page as number)"
      >
        {{ page }}
      </NuxtLink>
    </template>

    <!-- Next -->
    <NuxtLink
      v-if="!isNextDisabled"
      :to="getPageUrl(currentPage + 1)"
      class="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
      prefetch
      @click="emit('pageChange', currentPage + 1)"
    >
      <Icon
        name="heroicons-outline:chevron-right"
        class="w-5 h-5"
        aria-hidden="true"
      />
    </NuxtLink>
    <button
      v-else
      disabled
      class="px-3 py-2 rounded-lg border border-gray-200 text-gray-400 cursor-not-allowed"
    >
      <Icon
        name="heroicons-outline:chevron-right"
        class="w-5 h-5"
        aria-hidden="true"
      />
    </button>
  </nav>
</template>
