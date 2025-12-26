<script setup lang="ts">
import type { PaginationProps, PaginationEmits } from "~/types";

const {
  maxVisible = 5,
  baseUrl = "",
  currentPage,
  totalPages,
} = defineProps<PaginationProps>();

const emit = defineEmits<PaginationEmits>();
const route = useRoute();

const visiblePages = computed(() => {
  const pages: (number | string)[] = [];

  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    let start = Math.max(2, currentPage - 1);
    const end =
      currentPage <= 3
        ? Math.min(maxVisible - 1, totalPages - 1)
        : Math.min(totalPages - 1, currentPage + 1);

    if (currentPage >= totalPages - 2) {
      start = Math.max(2, totalPages - (maxVisible - 2));
    }

    if (start > 2) {
      pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }
  }

  return pages;
});

function getPageUrl(page: number): string {
  if (!baseUrl) return "#";

  const query = { ...route.query, offset: String(page) };
  const usp = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value == null || value === "") continue;

    if (Array.isArray(value)) {
      for (const item of value) usp.append(key, String(item));
    } else {
      usp.append(key, String(value));
    }
  }

  const qs = usp.toString();
  return `${baseUrl}${qs ? `?${qs}` : ""}`;
}

const isPrevDisabled = computed(() => currentPage <= 1);
const isNextDisabled = computed(() => currentPage >= totalPages);
const shouldPrefetchPage = (page: number) => Math.abs(page - currentPage) <= 1;

function handlePageChange(page: number) {
  if (page >= 1 && page <= totalPages && page !== currentPage) {
    emit("page-change", page);
  }
}
</script>

<template>
  <nav
    class="flex items-center justify-center gap-2 mt-4"
    aria-label="Pagination"
  >
    <NuxtLink
      v-if="baseUrl && !isPrevDisabled"
      :to="getPageUrl(currentPage - 1)"
      class="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-gray-700 flex items-center justify-center"
      prefetch
      @click="emit('page-change', currentPage - 1)"
    >
      <Icon
        name="ic:baseline-chevron-left"
        class="w-5 h-5"
        aria-hidden="true"
      />
    </NuxtLink>
    <button
      v-else
      :disabled="isPrevDisabled"
      class="px-3 py-2 rounded-lg border transition-colors flex items-center justify-center"
      :class="
        isPrevDisabled
          ? 'border-gray-200 text-gray-400 cursor-not-allowed'
          : 'border-gray-300 hover:bg-gray-50 text-gray-700'
      "
      @click="handlePageChange(currentPage - 1)"
    >
      <Icon
        name="ic:baseline-chevron-left"
        class="w-5 h-5"
        aria-hidden="true"
      />
    </button>

    <template v-for="(page, index) in visiblePages" :key="index">
      <span v-if="page === '...'" class="px-4 py-2 text-gray-500"> ... </span>
      <span
        v-else-if="page === currentPage"
        class="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold flex items-center justify-center min-w-[40px]"
        aria-current="page"
      >
        {{ page }}
      </span>

      <NuxtLink
        v-else-if="baseUrl"
        :to="getPageUrl(page as number)"
        class="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-gray-700 flex items-center justify-center min-w-[40px]"
        :prefetch="shouldPrefetchPage(page as number)"
        @click="emit('page-change', page as number)"
      >
        {{ page }}
      </NuxtLink>

      <button
        v-else
        class="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-gray-700 flex items-center justify-center min-w-[40px]"
        @click="handlePageChange(page as number)"
      >
        {{ page }}
      </button>
    </template>

    <NuxtLink
      v-if="baseUrl && !isNextDisabled"
      :to="getPageUrl(currentPage + 1)"
      class="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-gray-700 flex items-center justify-center"
      prefetch
      @click="emit('page-change', currentPage + 1)"
    >
      <Icon
        name="ic:baseline-chevron-right"
        class="w-5 h-5"
        aria-hidden="true"
      />
    </NuxtLink>
    <button
      v-else
      :disabled="isNextDisabled"
      class="px-3 py-2 rounded-lg border transition-colors flex items-center justify-center"
      :class="
        isNextDisabled
          ? 'border-gray-200 text-gray-400 cursor-not-allowed'
          : 'border-gray-300 hover:bg-gray-50 text-gray-700'
      "
      @click="handlePageChange(currentPage + 1)"
    >
      <Icon
        name="ic:baseline-chevron-right"
        class="w-5 h-5"
        aria-hidden="true"
      />
    </button>
  </nav>
</template>
