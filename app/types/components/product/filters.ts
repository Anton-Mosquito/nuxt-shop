// import type { Product } from "../../entities";

/**
 * Product sort options
 */
export type ProductSortOption =
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc"
  | "rating-desc"
  | "newest";

/**
 * Product filters
 */
export interface ProductFilters {
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  tags?: string[];
  inStock?: boolean;
  sortBy?: ProductSortOption;
}

/**
 * Product filter props
 * @unused - Reserved for future use
 */
// export interface ProductFilterProps {
//   filters: ProductFilters;
//   priceRange: { min: number; max: number };
// }

/**
 * Product grid props
 * @unused - Reserved for future use
 */
// export interface ProductGridProps {
//   products: Product[];
//   columns?: number;
//   loading?: boolean;
// }

/**
 * Product card props
 * @unused - Reserved for future use
 */
// export interface ProductCardProps {
//   product: Product;
//   showQuickView?: boolean;
//   showCompare?: boolean;
// }
