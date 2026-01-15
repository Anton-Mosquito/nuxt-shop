import type { CartWithRelations } from "..";
import type { ProductThumbnailInfo } from "./product";

export interface CartIdentification {
  cart: CartWithRelations;
  isGuest: boolean;
}

export type LineTotals = Pick<CartItem, "line_price" | "final_line_price"> & {
  discountAmount: number;
};

export interface PriceTotals {
  total_price: number;
  final_price: number;
}

export interface CartTotals extends PriceTotals {
  item_count: number;
}

export interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
  discount: number;
  line_price: number;
  final_line_price: number;
  product: ProductThumbnailInfo;
}
