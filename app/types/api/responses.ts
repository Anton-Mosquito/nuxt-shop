import type { Product } from "../entities/product";
import type { Category } from "../entities/category";
import type { User } from "../entities/user";
// import type { Review } from "../entities/review";
// import type { Order } from "../entities/cart";

/**
 * Generic API response wrapper
 * @unused - Reserved for future use
 */
// export interface ApiResponse<T> {
//   data: T;
//   success: boolean;
//   message?: string;
//   errors?: ApiError[];
// }

/**
 * Paginated response
 * @unused - Reserved for future use
 */
// export interface PaginatedResponse<T> {
//   data: T[];
//   meta: PaginationMeta;
// }

/**
 * Pagination metadata
 * @unused - Reserved for future use
 */
// export interface PaginationMeta {
//   currentPage: number;
//   totalPages: number;
//   totalItems: number;
//   itemsPerPage: number;
//   hasNextPage: boolean;
//   hasPreviousPage: boolean;
// }

/**
 * Login response
 */
export interface LoginResponse {
  user: User;
  token: string;
  refreshToken?: string;
  expiresIn: number;
}

/**
 * Get products response
 */
export interface GetProductsResponse {
  products: Product[];
  total: number;
  limit: number;
  offset: number;
}

/**
 * Get categories response
 */
export interface GetCategoriesResponse {
  categories: Category[];
}

/**
 * Get reviews response
 * @unused - Reserved for future use
 */
// export interface GetReviewsResponse {
//   reviews: Review[];
//   averageRating: number;
//   totalReviews: number;
// }

/**
 * Create order response
 * @unused - Reserved for future use
 */
// export interface CreateOrderResponse {
//   order: Order;
//   paymentUrl?: string;
// }

/**
 * API error object
 * @unused - Reserved for future use
 */
// export interface ApiError {
//   code: string;
//   message: string;
//   field?: string;
//   details?: Record<string, unknown>;
// }
