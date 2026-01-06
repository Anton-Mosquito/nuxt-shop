/**
 * Validation and form-related messages shared across the app.
 */
export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: "This field is required",
  EMAIL_REQUIRED: "Please enter your email",
  INPUT_PLACEHOLDER: "Your email for offers and news",
  INVALID_EMAIL: "Invalid email address",
  SUBSCRIBE_SUCCESS: "Your email has been subscribed to news and notifications",
  SUBMIT_ERROR: "Failed to submit the form. Please try again.",
  PASSWORDS_NO_MATCH: "Passwords do not match",
  TERMS_REQUIRED: "You must agree to the processing of personal data",
} as const;

export type ValidationMessageKey = keyof typeof VALIDATION_MESSAGES;
export type ValidationMessage = (typeof VALIDATION_MESSAGES)[ValidationMessageKey];
