import { z } from "zod";
import {
  coerceIdSchema,
  coercePositiveInt,
  coerceNonNegativeInt,
  optionalTrimmedString,
  optionalCoerceNumber,
  optionalBooleanFromString,
} from "./fields.schema";
import { VALIDATION_MESSAGES } from "~~/shared/constants";

export const productIdParamsSchema = z.object({
  id: coerceIdSchema(),
});

export const productIdsQuerySchema = z.object({
  ids: z
    .array(coerceIdSchema())
    .min(1, { message: VALIDATION_MESSAGES.PRODUCT_ID_REQUIRED }),
});

export const productQuerySchema = z.object({
  limit: coercePositiveInt(1, 100).default(20),
  offset: coerceNonNegativeInt().default(0),
  category: optionalTrimmedString(),
  search: optionalTrimmedString(),
  price_from: optionalCoerceNumber(0),
  price_to: optionalCoerceNumber(0),
  has_discount: optionalBooleanFromString(),
});

export type ProductIdParamsInput = z.infer<typeof productIdParamsSchema>;
export type ProductIdsQueryInput = z.infer<typeof productIdsQuerySchema>;
export type ProductsQueryInput = z.infer<typeof productQuerySchema>;
