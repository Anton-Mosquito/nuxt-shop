/**
 * Product review
 */
export interface Review {
  id: number;
  productId: number;
  name: string;
  text: string;
  rating: number;
  createdAt: string;
  helpful?: number;
  verified?: boolean;
}

/**
 * Review statistics for a product
 * @unused - Reserved for future use
 */
// export interface ReviewStats {
//   averageRating: number;
//   totalReviews: number;
//   ratingDistribution: {
//     1: number;
//     2: number;
//     3: number;
//     4: number;
//     5: number;
//   };
// }
