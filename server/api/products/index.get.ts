export default defineEventHandler(async (event) => {
  const db = await useDB();
  const query = getQuery(event);

  const limit = Number(query.limit) || 20;
  const offset = Number(query.offset) || 0;
  const category_id = query.category_id ? Number(query.category_id) : null;
  const search = query.search ? String(query.search) : null;

  try {
    // Build WHERE conditions
    let whereConditions = "";
    if (category_id) {
      whereConditions += ` AND p.category_id = ${category_id}`;
    }
    if (search) {
      // Escape single quotes in search term
      const escapedSearch = search.replace(/'/g, "''");
      whereConditions += ` AND (p.name LIKE '%${escapedSearch}%' OR p.short_description LIKE '%${escapedSearch}%')`;
    }

    // Get products
    const productsResult = (await db.exec(`
      SELECT 
        p.*,
        c.name as category_name,
        c.alias as category_alias
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE 1=1 ${whereConditions}
      ORDER BY p.id DESC
      LIMIT ${limit} OFFSET ${offset}
    `)) as { rows: ProductRow[] };

    // Get total count
    const countResult = (await db.exec(`
      SELECT COUNT(*) as total 
      FROM products p 
      WHERE 1=1 ${whereConditions}
    `)) as { rows: Array<{ total: number }> };

    const total = countResult.rows?.[0]?.total || 0;

    interface ProductRow {
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

    const formattedProducts = productsResult.rows.map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      short_description: p.short_description,
      long_description: p.long_description,
      sku: p.sku,
      discount: p.discount,
      images: p.images ? JSON.parse(p.images) : [],
      category_id: p.category_id,
      category: {
        id: p.category_id,
        name: p.category_name,
        alias: p.category_alias,
      },
      created_at: p.created_at,
      updated_at: p.updated_at,
    }));

    return {
      products: formattedProducts,
      total,
      limit,
      offset,
    };
  } catch (error: unknown) {
    console.error("Database error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch products",
    });
  }
});
