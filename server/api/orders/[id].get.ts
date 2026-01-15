import { orderIdParamsSchema, type OrderIdParams } from "~~/shared/schemas";
import { API_ERRORS } from "~~/shared/constants";
import { getOrderById } from "~~/server/services";
export default defineEventHandler(async (event): Promise<GetOrderResponse> => {
  const { id } = await getValidatedRouterParams<OrderIdParams>(
    event,
    orderIdParamsSchema.parse
  );
  const { user } = await getUserSession(event);

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: API_ERRORS.UNAUTHORIZED,
    });
  }

  return await getOrderById(id, user.id);
});
