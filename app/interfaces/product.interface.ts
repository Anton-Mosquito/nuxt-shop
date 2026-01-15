import type { ICategory } from "./category.interface";

export interface IProduct {
  id: number;
  name: string;
  price: number;
  short_description: string;
  long_description: string;
  sku: string;
  discount: number;
  images: string[];
  category_id: number;
  category: ICategory;
  created_at: string;
  updated_at: string;
}

export interface IGetProductsResponse {
  products: IProduct[];
  total: number;
  limit: number;
  offset: number;
}
