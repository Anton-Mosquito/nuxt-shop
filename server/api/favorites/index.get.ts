export default defineEventHandler((event) => {
  const query = getQuery(event);
  const headers = getHeaders(event);
  console.log("🚀 ~ query:", query, headers);
  return { favorites: [{ id: 1 }] };
});
