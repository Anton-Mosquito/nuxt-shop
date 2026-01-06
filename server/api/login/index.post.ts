import { z } from "zod";
import type { User } from "~/types";

const invalidCredentialsError = createError({
  statusCode: 401,
  message: "Invalid credentials",
});

export default defineEventHandler(async (event) => {
  const db = useDatabase();

  const { email, password } = await readValidatedBody(
    event,
    z.object({
      email: z.string().email(),
      password: z.string().min(8),
    }).parse
  );

  const user = await db.sql<{
    rows: User[];
  }>`SELECT * FROM users WHERE email = ${email}`.then(
    (result) => result.rows[0]
  );

  if (!user) {
    throw invalidCredentialsError;
  }

  if (!(await verifyPassword(user.password, password))) {
    throw invalidCredentialsError;
  }

  if (passwordNeedsReHash(user.password)) {
    const hashedPassword = await hashPassword(password);
    await db.sql`UPDATE users SET password = ${hashedPassword} WHERE id = ${user.id}`;
  }

  await setUserSession(event, {
    user: {
      email,
    },
    loggedInAt: Date.now(),
  });

  return setResponseStatus(event, 201);
});
