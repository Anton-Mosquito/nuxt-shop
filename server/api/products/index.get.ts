import { z } from "zod";
import type { Prisma } from "~/types/database";

const querySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
  category: z.string().optional(),
  search: z.string().optional(),
  price_from: z.coerce.number().min(0).optional(),
  price_to: z.coerce.number().min(0).optional(),
  has_discount: z.enum(["true", "false"]).optional(),
});

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, querySchema.parse);
  const {
    limit,
    offset,
    category,
    search,
    price_from,
    price_to,
    has_discount,
  } = query;

  const where: Prisma.ProductWhereInput = {
    ...(category ? { category: { slug: category } } : {}),
    ...(search
      ? {
          OR: [{ title: { contains: search, mode: "insensitive" } }],
        }
      : {}),
    ...(price_from !== undefined || price_to !== undefined
      ? {
          price: {
            ...(price_from !== undefined ? { gte: price_from } : {}),
            ...(price_to !== undefined ? { lte: price_to } : {}),
          },
        }
      : {}),
    ...(has_discount === "true" ? { discountPercentage: { gt: 0 } } : {}),
  };

  const [total, products] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      take: limit,
      skip: offset,
      where,
      include: { reviews: false },
      orderBy: { id: "asc" }, // Consistent ordering for pagination
    }),
  ]);

  return {
    products,
    total,
    limit,
    offset,
  };
});
