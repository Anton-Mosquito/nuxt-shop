export default defineEventHandler(async (event) => {
  const body = await readBody<{ a: 1 }>(event);
  console.log("🚀 ~ body:", body);
  return { success: true };
});
