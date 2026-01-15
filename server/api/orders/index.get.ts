import type { GetOrdersResponse } from "~~/shared/types/api/responses";
import { API_ERRORS } from "~~/shared/constants";

export default defineEventHandler(async (event): Promise<GetOrdersResponse> => {
  const { user } = await getUserSession(event);

  if (!user) {
    throw createError({ statusCode: 401, message: API_ERRORS.UNAUTHORIZED });
  }

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: {
      products: {
        include: {
          product: true,
        },
      },
      user: {
        select: {
          deliveryAddress: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return orders.map((o) => ({
    id: o.id,
    date: o.createdAt.toISOString(),
    status: o.status,
    total: computeTotalsFromEntries(o.products || []).final_price,
  }));
});
