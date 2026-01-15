export default defineEventHandler(async (event) => {
  const query = getQuery<{ email: string }>(event);
  const headers = getHeaders(event);
  if (!query.email) {
    throw createError({ statusCode: 400, statusMessage: "Email is required" });
  }
  console.log("🚀 ~ query:", query, headers);
  const res = await useStorage("db").getItem(query.email || "");
  return res;
});
