import type { AddToFavoritesRequest } from "~/types/api";

export default defineEventHandler(async (event) => {
  const { email, productIds } = await readBody<AddToFavoritesRequest>(event);
  console.log("🚀 ~ body:", { email, productIds });
  await useStorage("db").setItem(email, productIds);
  setResponseStatus(event, 201);
  return { success: true };
});
