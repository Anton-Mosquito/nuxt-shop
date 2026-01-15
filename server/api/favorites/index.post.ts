import { productIdFavoriteSchema } from "~~/shared/schemas/favorites.schema";
import type { ProductFavoriteInput } from "~~/shared/schemas/favorites.schema";

export default defineEventHandler(async (event): Promise<{ added: true }> => {
  const { user } = await requireUserSession(event);
  const { productId }: ProductFavoriteInput = await readValidatedBody(
    event,
    productIdFavoriteSchema.parse
  );

  await prisma.favorite.upsert({
    where: {
      userId_productId: {
        userId: user.id,
        productId,
      },
    },
    update: {},
    create: {
      userId: user.id,
      productId,
    },
  });

  return { added: true };
});
