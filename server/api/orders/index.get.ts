export default defineEventHandler(async (event) => {
  const db = await useDB();
  const authHeader = getHeader(event, "authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw createError({
      statusCode: 401,
      statusMessage: "Authorization token required",
    });
  }

  const token = authHeader.substring(7);

  try {
    await validateAuthToken(token);

    interface OrderRow {
      id: number;
      user_id: number;
      email: string;
      name: string;
      phone: string;
      delivery_address: string;
      total_amount: number;
      status: string;
      created_at: string;
    }

    // Get user's orders
    const ordersResult = (await db.sql`
      SELECT 
        o.id, o.user_id, o.email, o.name, o.phone, 
        o.delivery_address, o.total_amount, o.status, o.created_at
      FROM orders o
      WHERE o.user_id = (
        SELECT user_id FROM auth_tokens WHERE token = ${token}
      )
      ORDER BY o.created_at DESC
    `) as { rows: OrderRow[] };

    // Get order items for each order
    const ordersWithItems = await Promise.all(
      ordersResult.rows.map(async (order) => {
        const itemsResult = await db.sql`
          SELECT oi.product_id, oi.quantity, oi.price, p.name as product_name
          FROM order_items oi
          JOIN products p ON oi.product_id = p.id
          WHERE oi.order_id = ${order.id}
        `;

        return {
          ...order,
          items: itemsResult.rows,
        };
      })
    );

    return {
      orders: ordersWithItems,
    };
  } catch (error: unknown) {
    if ((error as { statusCode?: number }).statusCode) {
      throw error;
    }
    console.error("Database error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch orders",
    });
  }
});
