import { cartItemSchema } from "~~/shared/schemas";
import { addItemToCart } from "~~/server/services";

export default defineEventHandler(async (event) => {
  const { productId, quantity } = await readValidatedBody(
    event,
    cartItemSchema.parse
  );
  const { cart, isGuest } = await identifyCart(event);
  const userId = isGuest ? null : cart.userId;
  const token = isGuest ? cart.token : null;

  return await addItemToCart(userId, token, productId, quantity);
});
