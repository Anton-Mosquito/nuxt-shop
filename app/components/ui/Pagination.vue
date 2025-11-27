<script setup lang="ts">
interface Props {
  currentPage: number;
  totalPages: number;
  maxVisible?: number;
}

const { maxVisible = 5, currentPage, totalPages } = defineProps<Props>();

const emit = defineEmits<{
  (e: "page-change", page: number): void;
}>();

const visiblePages = computed(() => {
  const pages: (number | string)[] = [];
  const total = totalPages;
  const current = currentPage;
  const max = maxVisible;

  if (total <= max) {
    // Show all pages if total is less than max
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    // Always show first page
    pages.push(1);

    let start = Math.max(2, current - 1);
    let end = Math.min(total - 1, current + 1);

    // Adjust if near the beginning
    if (current <= 3) {
      end = Math.min(max - 1, total - 1);
    }

    // Adjust if near the end
    if (current >= total - 2) {
      start = Math.max(2, total - (max - 2));
    }

    // Add ellipsis after first page if needed
    if (start > 2) {
      pages.push("...");
    }

    // Add middle pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis before last page if needed
    if (end < total - 1) {
      pages.push("...");
    }

    // Always show last page
    if (total > 1) {
      pages.push(total);
    }
  }

  return pages;
});

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages && page !== currentPage) {
    emit("page-change", page);
  }
};

const previousPage = () => {
  if (currentPage > 1) {
    goToPage(currentPage - 1);
  }
};

const nextPage = () => {
  if (currentPage < totalPages) {
    goToPage(currentPage + 1);
  }
};
</script>

<template>
  <nav class="pagination" aria-label="Pagination">
    <button
      class="pagination__button pagination__button--prev"
      :disabled="currentPage === 1"
      aria-label="Previous page"
      @click="previousPage"
    >
      <Icon name="mdi:chevron-left" size="18" />
    </button>

    <template v-for="(page, index) in visiblePages" :key="`page-${index}`">
      <span v-if="page === '...'" class="pagination__ellipsis">...</span>
      <button
        v-else
        class="pagination__button"
        :class="{ 'pagination__button--active': page === currentPage }"
        @click="goToPage(page as number)"
        :aria-current="page === currentPage ? 'page' : undefined"
      >
        {{ page }}
      </button>
    </template>

    <button
      class="pagination__button pagination__button--next"
      :disabled="currentPage === totalPages"
      @click="nextPage"
      aria-label="Next page"
    >
      <Icon name="mdi:chevron-right" size="18" />
    </button>
  </nav>
</template>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  margin-top: 32px;
}

.pagination__button {
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #222;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.15s ease;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination__button:hover:not(:disabled):not(.pagination__button--active) {
  border-color: #d1d5db;
  background: #f9fafb;
}

.pagination__button:disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

.pagination__button--active {
  background: #000;
  color: #fff;
  border-color: #000;
  font-weight: 500;
  cursor: default;
}

.pagination__button--prev,
.pagination__button--next {
  font-size: 20px;
  font-weight: 300;
}

.pagination__ellipsis {
  min-width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-size: 14px;
}
</style>
