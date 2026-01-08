import { z } from "zod";

const paramsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, paramsSchema.parse);

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: "Product not found",
    });
  }

  const reviews = await prisma.review.findMany({
    where: { productId: id },
  });

  return { product, reviews };
});
