import type { Product as PrismaProduct } from "../database";

/**
 * Product entity matching Prisma `Product` model
 * Now re-exported from the generated Prisma Client via database.ts
 */
export type Product = PrismaProduct;
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
