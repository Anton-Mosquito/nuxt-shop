import type { Category } from "./category";

/**
 * Product entity representing an e-commerce product
 */
export interface Product {
  id: number;
  name: string;
  price: number;
  shortDescription: string;
  longDescription: string;
  sku: string;
  discount: number;
  images: string[];
  categoryId: number;
  category: Category;
  createdAt: string;
  updatedAt: string;
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
