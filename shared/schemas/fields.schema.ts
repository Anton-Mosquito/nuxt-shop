import { z } from "zod";
import { VALIDATION_MESSAGES } from "~~/shared/constants";

export const emailSchema = z
  .string()
  .min(1, { message: VALIDATION_MESSAGES.EMAIL_REQUIRED })
  .email({ message: VALIDATION_MESSAGES.INVALID_EMAIL });

// For newsletter/subscribe inputs that allow empty string as "no email provided"
export const optionalEmailOrEmpty = () =>
  z
    .string()
    .email({ message: VALIDATION_MESSAGES.INVALID_EMAIL })
    .or(z.literal(""));

// Required non-empty string with customizable field label
export const requiredString = (
  minLength: number = 1,
  label: string = VALIDATION_MESSAGES.REQUIRED_FIELD
) => z.string().min(minLength, { message: label });

// Minimum length helper for strings
export const minLength = (label: string, n: number, message?: string) =>
  z.string().min(n, {
    message: message ?? VALIDATION_MESSAGES.MIN_LENGTH(label, n),
  });

// Password helper with configurable minimum length
export const passwordSchema = (min = 8) =>
  z
    .string()
    .min(min, { message: VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH(min) });

// Generic positive integer id schema helper
export const idSchema = () => z.number().int().positive();

// Helper for array of ids
export const idArraySchema = () => z.array(idSchema());

// Coercing variant for route params / query strings that arrive as strings
export const coerceIdSchema = () => z.coerce.number().int().positive();

// Quantity helper for cart/items: default 1..999 range
export const quantitySchema = (min = 1, max = 999) =>
  z.number().int().min(min).max(max);

// integer > 0 (наприклад для limit, id тощо)
export const coercePositiveInt = (min = 1, max?: number) => {
  const schema = z.coerce.number().int().min(min);
  if (max) return schema.max(max);
  return schema;
};

// integer >= 0 (для offset)
export const coerceNonNegativeInt = () => z.coerce.number().int().min(0);

// optional string trimmed (для пошуку, категорій)
export const optionalTrimmedString = () => z.string().trim().optional();

// optional coerced number with min
export const optionalCoerceNumber = (min = 0) =>
  z.coerce.number().min(min).optional();

// optional boolean coerced from "true"/"false"
export const optionalBooleanFromString = () =>
  z.preprocess((val) => {
    if (val === "true") return true;
    if (val === "false") return false;
    return undefined;
  }, z.boolean().optional());

export default {
  emailSchema,
  optionalEmailOrEmpty,
  requiredString,
  minLength,
  passwordSchema,
  idSchema,
  idArraySchema,
  quantitySchema,
  coerceIdSchema,
};
