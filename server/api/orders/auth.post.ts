import { orderItemsSchema, type OrderItems } from "~~/shared/schemas";
import { API_ERRORS } from "~~/shared/constants";
import { createOrder } from "~~/server/services";

export default defineEventHandler(async (event): Promise<{ id: number }> => {
  const { user } = await getUserSession(event);

  if (!user) {
    throw createError({ statusCode: 401, message: API_ERRORS.UNAUTHORIZED });
  }

  const { items } = await readValidatedBody<OrderItems>(
    event,
    orderItemsSchema.parse
  );

  const order = await createOrder(user.id, items);

  return { id: order.id };
});
