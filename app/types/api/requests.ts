// import type { PaymentMethod, DeliveryMethod } from "../enums";

/**
 * Login request payload
 */
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * Register request payload
 * @unused - Reserved for future use
 */
// export interface RegisterRequest {
//   email: string;
//   password: string;
//   name: string;
//   phone?: string;
// }

/**
 * Password reset request
 * @unused - Reserved for future use
 */
// export interface PasswordResetRequest {
//   email: string;
// }

/**
 * Password change request
 * @unused - Reserved for future use
 */
// export interface PasswordChangeRequest {
//   oldPassword: string;
//   newPassword: string;
// }

/**
 * Create order request
 * @unused - Reserved for future use
 */
// export interface CreateOrderRequest {
//   items: Array<{
//     productId: number;
//     quantity: number;
//     variantId?: number;
//   }>;
//   shippingAddressId: number;
//   billingAddressId: number;
//   paymentMethod: PaymentMethod;
//   deliveryMethod: DeliveryMethod;
//   couponCode?: string;
// }

/**
 * Update product request
 * @unused - Reserved for future use
 */
// export interface UpdateProductRequest {
//   name?: string;
//   price?: number;
//   description?: string;
//   stock?: number;
//   categoryId?: number;
// }

/**
 * Create review request
 * @unused - Reserved for future use
 */
// export interface CreateReviewRequest {
//   productId: number;
//   name: string;
//   email: string;
//   rating: number;
//   comment: string;
// }

/**
 * Add to favorites request
 */
export interface AddToFavoritesRequest {
  email: string;
  productIds: number[];
}
