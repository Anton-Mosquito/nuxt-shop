import { z } from "zod";
import { idSchema, quantitySchema } from "./fields.schema";

// export const addToCartSchema = z.object({
//   items: z
//     .array(
//       z.object({
//         id: idSchema(),
//         quantity: quantitySchema()
//       })
//     )
//     .min(1)
//     .max(50)
// })

export const cartItemSchema = z.object({
  productId: idSchema(),
  quantity: quantitySchema(0),
});

export type CartItemInput = z.infer<typeof cartItemSchema>;
