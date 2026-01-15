export default defineEventHandler(async (event) => {
  const { cart } = await identifyCart(event);

  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id },
  });

  const updatedCart = await getOrCreateCart(cart.userId, cart.token);
  return formatCartResponse(updatedCart);
});
