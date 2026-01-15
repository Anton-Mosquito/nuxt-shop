import {
  emailPasswordSchema,
  type EmailPasswordInput,
} from "~~/shared/schemas";
import { validateUserCredentials } from "~~/server/services/users";

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody<EmailPasswordInput>(
    event,
    emailPasswordSchema.parse
  );

  const user = await validateUserCredentials(email, password);

  await setUserSession(event, {
    user: {
      id: user.id,
      email,
    },
    loggedInAt: Date.now(),
  });

  return setResponseStatus(event, 201);
});
