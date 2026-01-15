import { z } from "zod";
import {
  emailSchema,
  passwordSchema,
  requiredString,
  idSchema,
  quantitySchema,
  coerceIdSchema,
} from "./fields.schema";

export const shippingDetailsRequiredSchema = z.object({
  name: requiredString(1,"Name"),
  phone: requiredString(1,"Phone"),
  address: requiredString(1,"Address"),
});

export const shippingDetailsSchema = shippingDetailsRequiredSchema.partial();

export const guestOrderSchema = shippingDetailsRequiredSchema.extend({
  email: emailSchema,
  password: passwordSchema(8),
});

export const itemSchema = z.object({
  productId: idSchema(),
  quantity: quantitySchema(),
});

export const itemsArraySchema = z.array(itemSchema).min(1).max(50);

export const orderItemsSchema = z.object({
  items: itemsArraySchema,
});

export const orderRequestSchema = z.object({
  items: itemsArraySchema,
  customer: guestOrderSchema,
});

export const orderIdParamsSchema = z.object({
  id: coerceIdSchema(),
});

export type GuestOrderInput = z.infer<typeof guestOrderSchema>;
export type OrderRequest = z.infer<typeof orderRequestSchema>;
export type ShippingDetails = z.infer<typeof shippingDetailsSchema>;
export type ShippingDetailsRequired = z.infer<
  typeof shippingDetailsRequiredSchema
>;
export type OrderIdParams = z.infer<typeof orderIdParamsSchema>;
export type OrderItems = z.infer<typeof orderItemsSchema>;

export type OrderFormInput =
  | GuestOrderInput
  | ShippingDetailsRequired
  | ShippingDetails;
