import type { ICreateFavorite } from "~/interfaces/favorite.interface";

export default defineEventHandler(async (event) => {
  const { email, ids } = await readBody<ICreateFavorite>(event);
  console.log("🚀 ~ body:", { email, ids });
  await useStorage("db").setItem(email, ids);
  setResponseStatus(event, 201);
  return { success: true };
});
