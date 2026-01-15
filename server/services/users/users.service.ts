import { API_ERRORS } from "~~/shared/constants/messages";

interface CreateUserPayload {
  email: string;
  password: string;
  name?: string;
  phone?: string;
  deliveryAddress?: string;
}

export async function findUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

export async function createUser(data: CreateUserPayload) {
  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    throw createError({
      statusCode: 409,
      message: API_ERRORS.USER_EXISTS,
    });
  }

  const hashedPassword = await hashPassword(data.password);

  return await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      name: data.name,
      phone: data.phone,
      deliveryAddress: data.deliveryAddress,
    },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });
}

export async function validateUserCredentials(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw createError({
      statusCode: 401,
      message: API_ERRORS.INVALID_CREDENTIALS,
    });
  }

  const isValid = await verifyPassword(user.password, password);
  if (!isValid) {
    throw createError({
      statusCode: 401,
      message: API_ERRORS.INVALID_CREDENTIALS,
    });
  }

  if (passwordNeedsReHash(user.password)) {
    const newHash = await hashPassword(password);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: newHash },
    });
  }

  return { id: user.id, email: user.email };
}
