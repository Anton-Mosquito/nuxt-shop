import {
  emailPasswordSchema,
  type EmailPasswordInput,
} from "~~/shared/schemas";
import { createUser } from "~~/server/services";

export default defineEventHandler(async (event): Promise<void> => {
  const { email, password } = await readValidatedBody<EmailPasswordInput>(
    event,
    emailPasswordSchema.parse
  );
  const newUser = await createUser({ email, password });

  // In real applications, you should send a confirmation email to the user before logging them in.

  await setUserSession(event, {
    user: {
      id: newUser.id,
      email: newUser.email,
    },
    loggedInAt: Date.now(),
  });

  setResponseStatus(event, 201);
  return;
});
