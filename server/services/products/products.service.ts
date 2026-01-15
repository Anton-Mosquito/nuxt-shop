import type { Prisma } from "~~/server/types";
import { API_ERRORS } from "~~/shared/constants/messages";
import type { ProductsQueryInput } from "~~/shared/schemas";

function buildProductWhere(
  filters: ProductsQueryInput
): Prisma.ProductWhereInput {
  const where: Prisma.ProductWhereInput = {};

  if (filters.category) {
    where.category = { slug: filters.category };
  }

  if (filters.search) {
    where.OR = [{ title: { contains: filters.search, mode: "insensitive" } }];
  }

  if (filters.price_from !== undefined || filters.price_to !== undefined) {
    where.price = {};
    if (filters.price_from !== undefined) where.price.gte = filters.price_from;
    if (filters.price_to !== undefined) where.price.lte = filters.price_to;
  }

  if (filters.has_discount) {
    where.discountPercentage = { gt: 0 };
  }

  return where;
}

export async function listProducts(query: ProductsQueryInput) {
  const where = buildProductWhere(query);

  const [total, products] = await prisma.$transaction([
    prisma.product.count({ where }),
    prisma.product.findMany({
      take: query.limit,
      skip: query.offset,
      where,
      orderBy: { id: "asc" }
    }),
  ]);

  return { total, products };
}

export async function getProductById(id: number) {
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    throw createError({
      statusCode: 404,
      message: API_ERRORS.PRODUCT_NOT_FOUND,
    });
  }

  const reviews = await prisma.review.findMany({
    where: { productId: id },
    orderBy: { createdAt: "desc" },
  });

  return { product, reviews };
}

export async function getProductsByIds(ids: number[]) {
  return await prisma.product.findMany({
    where: {
      id: { in: ids },
    },
    orderBy: { id: "asc" },
  });
}
