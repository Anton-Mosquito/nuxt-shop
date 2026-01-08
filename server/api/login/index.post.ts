import { z } from "zod";

const invalidCredentialsError = createError({
  statusCode: 401,
  message: "Invalid credentials",
});

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(
    event,
    z.object({
      email: z.string().email(),
      password: z.string().min(8),
    }).parse
  );

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw invalidCredentialsError;
  }

  if (!(await verifyPassword(user.password, password))) {
    throw invalidCredentialsError;
  }

  if (passwordNeedsReHash(user.password)) {
    const hashedPassword = await hashPassword(password);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });
  }

  await setUserSession(event, {
    user: {
      id: user.id,
      email,
    },
    loggedInAt: Date.now(),
  });

  return setResponseStatus(event, 201);
});
