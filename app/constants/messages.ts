export const MESSAGES = {
  NO_DESCRIPTION: "No description available.",
  ORDER_CREATED: (id: number) => `Order #${id} created successfully!`,
  SUBSCRIBE_SUCCESS: "Your email has been subscribed to news and notifications",
  PASSWORD_RESET_LINK:
    "If an account exists with this email, you will receive a password reset link.",
  LOADING_PRODUCT_DETAILS: "Loading product details...",
  LOADING_FAVORITES: "Loading favorites...",
} as const;

export type MessageKey = keyof typeof MESSAGES;
export type Message = (typeof MESSAGES)[MessageKey];

export const ERROR_MESSAGES = {
  PRODUCT_NOT_FOUND: "Product not found",
  PAGE_NOT_FOUND: "Page not found",
  FAILED_TO_CREATE_ORDER: "Failed to create order",
  ERROR_OCCURRED: "An unexpected error occurred",
  FAILED_TO_LOAD_CONTENT: "Failed to load content. Please try again.",
  FAILED_TO_FETCH_CART: "Failed to fetch cart.",
  FAILED_TO_ADD_ITEM: "Failed to add item to cart.",
  FAILED_TO_CHANGE_QUANTITY: "Failed to change item quantity.",
  GENERIC_ERROR:
    "We apologize for the inconvenience. We are already working on a solution.",
} as const;

export type ErrorMessageKey = keyof typeof ERROR_MESSAGES;
export type ErrorMessage = (typeof ERROR_MESSAGES)[ErrorMessageKey];
