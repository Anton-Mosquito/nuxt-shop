import { z } from "zod";
import { idSchema, idArraySchema } from "./fields.schema";

export const productIdFavoriteSchema = z.object({
  productId: idSchema(),
});

export const syncFavoritesSchema = z.object({
  ids: idArraySchema(),
});

export type ProductFavoriteInput = z.infer<typeof productIdFavoriteSchema>;
export type SyncFavoritesInput = z.infer<typeof syncFavoritesSchema>;

