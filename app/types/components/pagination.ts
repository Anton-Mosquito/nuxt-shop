export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl?: string;
  maxVisible?: number;
}

export interface PaginationEmits {
  "page-change": [page: number];
}
