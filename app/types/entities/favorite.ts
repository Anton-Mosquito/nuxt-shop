/**
 * Favorite/wishlist entity
 */
export interface Favorite {
  email: string;
  productIds: number[];
}

/**
 * Favorite item with product details
 * @unused - Reserved for future use
 */
// export interface FavoriteItem {
//   id: number;
//   productId: number;
//   userId?: number;
//   email?: string;
//   createdAt: string;
// }
