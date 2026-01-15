// import type { Product, ProductVariant } from "./product";
// import type { User, Address } from "./user";

/**
 * Shopping cart item
 * @unused - Reserved for future use
 */
// export interface CartItem {
//   id: string;
//   productId: number;
//   product: Product;
//   quantity: number;
//   price: number;
//   subtotal: number;
//   variantId?: number;
//   variant?: ProductVariant;
// }

/**
 * Shopping cart
 * @unused - Reserved for future use
 */
// export interface Cart {
//   items: CartItem[];
//   subtotal: number;
//   tax: number;
//   shipping: number;
//   discount: number;
//   total: number;
//   couponCode?: string;
// }

/**
 * Order status enum
 */
export enum OrderStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
  REFUNDED = "refunded",
}

/**
 * Payment method enum
 */
export enum PaymentMethod {
  CREDIT_CARD = "credit_card",
  PAYPAL = "paypal",
  CASH_ON_DELIVERY = "cash_on_delivery",
}

/**
 * Order item
 * @unused - Reserved for future use
 */
// export interface OrderItem {
//   id: number;
//   productId: number;
//   product: Product;
//   quantity: number;
//   price: number;
//   subtotal: number;
//   variant?: ProductVariant;
// }

/**
 * Order entity
 * @unused - Reserved for future use
 */
// export interface Order {
//   id: number;
//   userId: number;
//   user?: User;
//   status: OrderStatus;
//   items: OrderItem[];
//   subtotal: number;
//   tax: number;
//   shipping: number;
//   discount: number;
//   total: number;
//   shippingAddress: Address;
//   billingAddress: Address;
//   paymentMethod: PaymentMethod;
//   trackingNumber?: string;
//   createdAt: string;
//   updatedAt: string;
// }
