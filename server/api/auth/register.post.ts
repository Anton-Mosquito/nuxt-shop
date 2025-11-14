export default defineEventHandler(async (event) => {
  const db = await useDB();
  const { email, password } = await readBody<{
    email: string;
    password: string;
  }>(event);

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email and password are required",
    });
  }

  try {
    // Check if user already exists
    const existingUser = await db.sql`
      SELECT id FROM users WHERE email = ${email}
    `;

    if (existingUser.rows && existingUser.rows.length > 0) {
      throw createError({
        statusCode: 409,
        statusMessage: "User already exists",
      });
    }

    // Create new user
    const result = await db.sql`
      INSERT INTO users (email, password, name, phone, address)
      VALUES (${email}, ${password}, '', '', '')
      RETURNING id, email, name, phone, address
    `;

    const user = result.rows?.[0] as
      | {
          id: number;
          email: string;
          name: string;
          phone: string;
          address: string;
        }
      | undefined;

    if (!user) {
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to create user",
      });
    }

    // Generate token
    const token = btoa(`${email}:${Date.now()}`);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // 30 days

    await db.sql`
      INSERT INTO auth_tokens (token, user_id, expires_at)
      VALUES (${token}, ${user.id}, ${expiresAt.toISOString()})
    `;

    setResponseStatus(event, 201);
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        address: user.address,
      },
    };
  } catch (error: unknown) {
    if ((error as { statusCode?: number }).statusCode) {
      throw error;
    }
    console.error("Database error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Registration failed",
    });
  }
});
