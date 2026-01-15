import type { Product as PrismaProduct } from "~~/server/types/database";

export type Product = PrismaProduct;

export type ProductThumbnailInfo = Pick<
  Product,
  "id" | "title" | "thumbnail" | "price"
>;
