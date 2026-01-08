import { z } from "zod";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, bodySchema.parse);

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    throw createError({ statusCode: 409, message: "User already exists" });
  }

  const hashedPassword = await hashPassword(password);

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  // In real applications, you should send a confirmation email to the user before logging them in.

  await setUserSession(event, {
    user: {
      email,
    },
    loggedInAt: Date.now(),
  });

  return setResponseStatus(event, 201);
});
