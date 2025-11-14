export default defineEventHandler(async (event) => {
  const db = await useDB();
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Product ID is required",
    });
  }

  try {
    const result = await db.sql`
      SELECT 
        p.*,
        c.name as category_name,
        c.alias as category_alias
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ${id}
    `;

    const product = result.rows?.[0] as
      | {
          id: number;
          name: string;
          price: number;
          short_description: string;
          long_description: string;
          sku: string;
          discount: number;
          images: string;
          category_id: number;
          category_name: string;
          category_alias: string;
          created_at: string;
          updated_at: string;
        }
      | undefined;

    if (!product) {
      throw createError({
        statusCode: 404,
        statusMessage: "Product not found",
      });
    }

    return {
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
        short_description: product.short_description,
        long_description: product.long_description,
        sku: product.sku,
        discount: product.discount,
        images: product.images ? JSON.parse(product.images) : [],
        category_id: product.category_id,
        category: {
          id: product.category_id,
          name: product.category_name,
          alias: product.category_alias,
        },
        created_at: product.created_at,
        updated_at: product.updated_at,
      },
    };
  } catch (error: unknown) {
    if ((error as { statusCode?: number }).statusCode === 404) {
      throw error;
    }
    console.error("Database error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch product",
    });
  }
});
