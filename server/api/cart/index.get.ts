export default defineEventHandler(async (event) => {
  const { cart } = await identifyCart(event);
  return await formatCartResponse(cart);
});
