export default defineEventHandler(async () => {
  const db = await useDB();

  try {
    const result = await db.sql`
      SELECT id, name, alias FROM categories ORDER BY name
    `;

    return {
      categories: result.rows,
    };
  } catch (error: unknown) {
    console.error("Database error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch categories",
    });
  }
});
