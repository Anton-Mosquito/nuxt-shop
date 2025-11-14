export default defineEventHandler(async (event) => {
  const db = await useDB();
  const authHeader = getHeader(event, "authorization");
  const body = await readBody<{
    product_ids: number[];
    delivery_address: string;
    name: string;
    phone: string;
  }>(event);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw createError({
      statusCode: 401,
      statusMessage: "Authorization token required",
    });
  }

  const token = authHeader.substring(7);
  const { product_ids, delivery_address, name, phone } = body;

  if (!product_ids || !delivery_address || !name || !phone) {
    throw createError({
      statusCode: 400,
      statusMessage: "All fields are required",
    });
  }

  try {
    const user = await validateAuthToken(token);

    // Get products and calculate total
    let totalAmount = 0;
    const productDetails: Array<{ id: number; price: number }> = [];

    for (const productId of product_ids) {
      const productResult =
        await db.sql`SELECT id, price FROM products WHERE id = ${productId}`;
      const product = productResult.rows?.[0] as
        | { id: number; price: number }
        | undefined;

      if (product) {
        productDetails.push(product);
        totalAmount += product.price;
      }
    }

    // Create order
    const orderResult = await db.sql`
      INSERT INTO orders (user_id, email, name, phone, delivery_address, total_amount, status)
      VALUES (${user.userId}, ${user.email}, ${name}, ${phone}, ${delivery_address}, ${totalAmount}, 'pending')
      RETURNING id, user_id, email, name, phone, delivery_address, total_amount, status, created_at
    `;

    const order = orderResult.rows?.[0] as
      | {
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
      | undefined;

    if (!order) {
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to create order",
      });
    }

    // Create order items
    for (const product of productDetails) {
      await db.sql`
        INSERT INTO order_items (order_id, product_id, quantity, price)
        VALUES (${order.id}, ${product.id}, 1, ${product.price})
      `;
    }

    setResponseStatus(event, 201);
    return {
      order: {
        id: order.id,
        user_id: order.user_id,
        email: order.email,
        name: order.name,
        phone: order.phone,
        delivery_address: order.delivery_address,
        total_amount: order.total_amount,
        status: order.status,
        created_at: order.created_at,
        items: productDetails.map((p) => ({
          product_id: p.id,
          price: p.price,
          quantity: 1,
        })),
      },
    };
  } catch (error: unknown) {
    if ((error as { statusCode?: number }).statusCode) {
      throw error;
    }
    console.error("Database error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create authenticated order",
    });
  }
});
