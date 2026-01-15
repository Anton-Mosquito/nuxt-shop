export default defineEventHandler(async (event): Promise<number[]> => {
  const { user } = await requireUserSession(event);

  const favorites = await prisma.favorite.findMany({
    where: { userId: user.id },
    select: { productId: true },
  });

  return favorites.map(({ productId }) => productId);
});
