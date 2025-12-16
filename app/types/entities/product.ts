import type { Category } from "./category";

/**
 * Product entity representing an e-commerce product
 */
export interface Product {
  id: number;
  name: string;
  price: number;
  short_description: string;
  long_description: string;
  sku: string;
  discount: number;
  images: string[];
  category_id: number;
  category: Category;
  created_at: string;
  updated_at: string;
}

/**
 * Extended product with additional computed properties
 * @unused - Reserved for future use
 */
// export interface ProductExtended extends Product {
//   finalPrice: number;
//   hasDiscount: boolean;
//   discountPercentage: number;
// }

/**
 * Product variant for different sizes, colors, etc.
 * @unused - Reserved for future use
 */
// export interface ProductVariant {
//   id: number;
//   productId: number;
//   name: string;
//   sku: string;
//   price: number;
//   stock: number;
//   attributes: Record<string, string>;
// }

/**
 * Product image
 * @unused - Reserved for future use
 */
// export interface ProductImage {
//   id: number;
//   url: string;
//   alt: string;
//   isPrimary: boolean;
//   order: number;
// }
