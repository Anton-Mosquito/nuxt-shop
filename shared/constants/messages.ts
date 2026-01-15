export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: "This field is required",
  EMAIL_REQUIRED: "Please enter correct email",
  PASSWORD_MIN_LENGTH: (min: number) =>
    `"Password must be at least ${min} characters"`,
  PASSWORDS_NOT_MATCH: "Passwords do not match",
  INPUT_PLACEHOLDER: "Your email for offers and news",
  INVALID_EMAIL: "Invalid email address",
  SUBMIT_ERROR: "Failed to submit the form. Please try again.",
  TERMS_REQUIRED: "You must agree to the processing of personal data",
  MIN_LENGTH: (field: string, n: number) =>
    `${field} must be at least ${n} characters`,
  PRODUCT_ID_REQUIRED: "At least one product ID is required",
  RATING_REQUIRED: "Please provide a rating",
  FEEDBACK_MAX_LENGTH: "Feedback must not exceed 1000 characters",
} as const;

export type ValidationMessageKey = keyof typeof VALIDATION_MESSAGES;
export type ValidationMessage =
  | (typeof VALIDATION_MESSAGES)[ValidationMessageKey]
  | ReturnType<typeof VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH>
  | ReturnType<typeof VALIDATION_MESSAGES.MIN_LENGTH>;

export const API_ERRORS = {
  UNAUTHORIZED: "You must be logged in to perform this action",
  FORBIDDEN: "You do not have permission to perform this action",
  INVALID_CREDENTIALS: "Invalid email or password",
  USER_EXISTS: "A user with this email already exists",
  USER_NOT_FOUND: "User not found",
  NOT_FOUND: (resource: string) => `${resource} not found`,
  CART_NOT_FOUND: "Cart not found",
  PRODUCT_NOT_FOUND: "Product not found",
  ORDER_NOT_FOUND: "Order not found",
  INTERNAL_ERROR: "An internal server error occurred",
  BAD_REQUEST: "Bad request",
} as const;

export type ApiErrorKey = keyof typeof API_ERRORS;
export type ApiError =
  | (typeof API_ERRORS)[ApiErrorKey]
  | ReturnType<typeof API_ERRORS.NOT_FOUND>;
