export const DEFAULT_CURRENCY = "USD";
export const CART_INCLUDE_OPTIONS = {
  include: { items: { include: { product: true } } },
} as const;

export const CART_TOKEN_COOKIE = "cart_token";
export const COOKIE_MAX_AGE_DAYS = 30;

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 60 * 60 * 24 * COOKIE_MAX_AGE_DAYS,
  path: "/",
};
