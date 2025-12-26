/**
 * Pagination component props
 */
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl?: string;
  maxVisible?: number;
}

/**
 * Pagination component emits
 */
export interface PaginationEmits {
  "page-change": [page: number];
}
