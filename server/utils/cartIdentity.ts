import { type H3Event, getCookie, setCookie } from "h3";
import { randomUUID } from "crypto";
import { CART_TOKEN_COOKIE, COOKIE_OPTIONS } from "~~/server/constants";

function getOrGenerateCartToken(event: H3Event): string {
  const existingToken = getCookie(event, CART_TOKEN_COOKIE);

  if (existingToken) return existingToken;

  const newToken = randomUUID();
  setCookie(event, CART_TOKEN_COOKIE, newToken, COOKIE_OPTIONS);

  return newToken;
}

async function getAuthenticatedUserCart(
  userId: number
): Promise<CartIdentification> {
  const cart = await getOrCreateCart(userId, null);
  return { cart, isGuest: false };
}

async function getGuestCart(event: H3Event): Promise<CartIdentification> {
  const token = getOrGenerateCartToken(event);
  const cart = await getOrCreateCart(null, token);
  return { cart, isGuest: true };
}

// Main function
export async function identifyCart(
  event: H3Event
): Promise<CartIdentification> {
  const session = await getUserSession(event);
  const userId = session.user?.id;

  return userId ? getAuthenticatedUserCart(userId) : getGuestCart(event);
}
