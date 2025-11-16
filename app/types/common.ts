// Common types used across the app

// Pagination
export interface PaginationParams {
  page: number;
  pageSize: number;
  total?: number;
}

// API Response
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
}

// Sort and Filter
export interface SortOption {
  value: string;
  label: string;
}

export interface FilterOption {
  id: string;
  label: string;
  value: string | number | boolean;
}

// Image
export interface ImageData {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

// Common utility types
export type ValueOf<T> = T[keyof T];
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
