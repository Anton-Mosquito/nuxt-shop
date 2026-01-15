/**
 * Reusable user-visible messages for errors and common states.
 * Prefer `as const` object over TS `enum` for smaller bundles and better inference.
 */
export const ERROR_MESSAGES = {
  PRODUCT_NOT_FOUND: "Product not found",
  PAGE_NOT_FOUND: "Page not found",
} as const;

export type ErrorMessageKey = keyof typeof ERROR_MESSAGES;
export type ErrorMessage = (typeof ERROR_MESSAGES)[ErrorMessageKey];
