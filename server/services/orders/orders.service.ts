import { calculateLineTotals, computeTotalsFromEntries } from "../../utils/cart";
import { API_ERRORS } from "~~/shared/constants/messages";
import type { OrderItems } from "~~/shared/schemas";
import type { OrderWithRelations } from "~~/server/types/database";

export async function createOrder(userId: number, items: OrderItems["items"]) {
  return await prisma.$transaction(async (tx) => {
    return await tx.order.create({
      data: {
        userId,
        status: "new",
        products: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
      select: { id: true },
    });
  });
}


export async function getOrderById(
  orderId: number,
  userId: number
): Promise<GetOrderResponse> {
  const order: OrderWithRelations | null = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      products: {
        include: {
          product: true,
        },
      },
      user: {
        select: {
          email: true,
          name: true,
          phone: true,
          deliveryAddress: true,
        },
      },
    },
  });

  if (!order) {
    throw createError({ statusCode: 404, message: API_ERRORS.ORDER_NOT_FOUND });
  }

  if (order.userId !== userId) {
    throw createError({ statusCode: 403, message: API_ERRORS.FORBIDDEN });
  }

  const productsWithTotals = order.products.map((product) => ({
    ...product,
    product: {
      ...product.product,
      final_line_price: calculateLineTotals(
        product.product?.price ?? 0,
        product.quantity ?? 0,
        product.product?.discountPercentage ?? 0
      ).final_line_price,
    },
  }));

  return {
    id: order.id,
    createdAt: order.createdAt.toISOString(),
    status: order.status,
    products: productsWithTotals,
    user: order.user ?? null,
    total: computeTotalsFromEntries(order.products || []).final_price,
  };
}
