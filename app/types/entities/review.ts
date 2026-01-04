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
