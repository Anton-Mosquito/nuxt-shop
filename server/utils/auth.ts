export async function validateAuthToken(token: string) {
  const db = await useDB();

  const result = await db.sql`
    SELECT t.user_id, t.expires_at, u.email, u.name, u.phone, u.address
    FROM auth_tokens t
    JOIN users u ON t.user_id = u.id
    WHERE t.token = ${token} AND t.expires_at > datetime('now')
  `;

  const user = result.rows?.[0] as
    | {
        user_id: number;
        expires_at: string;
        email: string;
        name: string;
        phone: string;
        address: string;
      }
    | undefined;

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid or expired token",
    });
  }

  return {
    userId: user.user_id,
    email: user.email,
    name: user.name,
    phone: user.phone,
    address: user.address,
  };
}
