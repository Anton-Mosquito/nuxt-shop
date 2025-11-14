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
    // Get user from database
    const result = await db.sql`
      SELECT id, email, password, name, phone, address
      FROM users
      WHERE email = ${email}
    `;

    const user = result.rows?.[0] as
      | {
          id: number;
          email: string;
          password: string;
          name: string;
          phone: string;
          address: string;
        }
      | undefined;

    if (!user || user.password !== password) {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid credentials",
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
      statusMessage: "Login failed",
    });
  }
});
