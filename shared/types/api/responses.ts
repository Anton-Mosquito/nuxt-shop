import type { Product, Category, Review } from "~~/server/types/database";
import type { CartItem } from "../entities/carts";

export interface GetProductsResponse {
  products: Product[];
}

export interface GetProductResponse {
  product: Product;
  reviews: Review[];
}

export interface ProductsQueryResponse extends GetProductsResponse {
  total: number;
  limit: number;
  offset: number;
}

export interface GetCategoriesResponse {
  categories: Category[];
}

export interface OrderSummary {
  id: number;
  date: string;
  status: string;
  total: number;
}

export type GetOrdersResponse = OrderSummary[];

export interface OrderProductEntry {
  orderId: number;
  productId: number;
  quantity: number;
  product: Product & { final_line_price: number };
}

export interface OrderDetail {
  id: number;
  createdAt: string; // ISO date
  status: string;
  products: OrderProductEntry[];
  user: {
    email?: string | null;
    name?: string | null;
    phone?: string | null;
    deliveryAddress?: string | null;
  } | null;
  total: number;
}

export type GetOrderResponse = OrderDetail;

export interface CartResponse {
  id: number;
  token: string | null;
  user_id: number | null;
  item_count: number;
  total_price: number;
  final_price: number;
  currency: string;
  items: CartItem[];
}
