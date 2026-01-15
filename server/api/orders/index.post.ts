import { orderRequestSchema, type OrderRequest } from "~~/shared/schemas";
import { createOrder, createUser } from "~~/server/services";

export default defineEventHandler(async (event): Promise<{ id: number }> => {
  const {
    items,
    customer: { email, password, name, phone, address },
  } = await readValidatedBody<OrderRequest>(event, orderRequestSchema.parse);

  const newUser = await createUser({
    email,
    password,
    name,
    phone,
    deliveryAddress: address,
  });

  await setUserSession(event, {
    user: {
      id: newUser.id,
      email: newUser.email,
    },
    loggedInAt: Date.now(),
  });

  const order = await createOrder(newUser.id, items);

  return { id: order.id };
});
