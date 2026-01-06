import { z } from "zod";
import type { User } from "~/types";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default defineEventHandler(async (event) => {
  const db = useDatabase();
  const { email, password } = await readValidatedBody(event, bodySchema.parse);

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      message: "Email and password required",
    });
  }

  const existing: { rows: User[]; success: boolean } =
    await db.sql`SELECT id FROM users WHERE email = ${email} LIMIT 1`;

  if (existing && existing.rows.length > 0) {
    throw createError({ statusCode: 409, message: "User already exists" });
  }

  const hashedPassword = await hashPassword(password);

  await db.sql`INSERT INTO users(email, password) VALUES (${email}, ${hashedPassword})`;

  // In real applications, you should send a confirmation email to the user before logging them in.

  await setUserSession(event, {
    user: {
      email,
    },
    loggedInAt: Date.now(),
  });

  return setResponseStatus(event, 201);
});
