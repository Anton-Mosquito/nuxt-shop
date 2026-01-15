import { cartItemSchema } from "~~/shared/schemas/cart.schema";
import type { CartItemInput } from "~~/shared/schemas/cart.schema";
import { API_ERRORS } from "~~/shared/constants";

export default defineEventHandler(async (event) => {
  const { productId, quantity }: CartItemInput = await readValidatedBody(
    event,
    cartItemSchema.parse
  );
  const { cart } = await identifyCart(event);

  if (quantity === 0) {
    await prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id,
        productId,
      },
    });
  } else {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      throw createError({
        statusCode: 404,
        statusMessage: API_ERRORS.PRODUCT_NOT_FOUND,
      });
    }

    await prisma.cartItem.upsert({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
      update: { quantity },
      create: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });
  }

  const updatedCart = await getOrCreateCart(cart.userId, cart.token);
  return formatCartResponse(updatedCart);
});
