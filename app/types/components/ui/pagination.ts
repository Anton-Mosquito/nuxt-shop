/**
 * Pagination component props
 */
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  maxVisible?: number;
}

/**
 * Pagination component emits
 */
export type PaginationEmits = {
  "update:current-page": [page: number];
  change: [page: number];
};
