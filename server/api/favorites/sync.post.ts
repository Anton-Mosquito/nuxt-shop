import { syncFavoritesSchema } from "~~/shared/schemas/favorites.schema";
import type { SyncFavoritesInput } from "~~/shared/schemas/favorites.schema";

export default defineEventHandler(async (event): Promise<number[]> => {
  const { user } = await requireUserSession(event);
  const { ids }: SyncFavoritesInput = await readValidatedBody(
    event,
    syncFavoritesSchema.parse
  );

  if (ids.length > 0) {
    const data = ids.map((productId) => ({
      userId: user.id,
      productId,
    }));

    await prisma.favorite.createMany({
      data,
      skipDuplicates: true,
    });
  }

  const favorites = await prisma.favorite.findMany({
    where: { userId: user.id },
    select: { productId: true },
  });

  return favorites.map((f) => f.productId);
});
