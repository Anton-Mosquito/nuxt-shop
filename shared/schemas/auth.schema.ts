import { z } from "zod";
import { emailSchema, requiredString } from "./fields.schema";
import { VALIDATION_MESSAGES } from "~~/shared/constants";

export const registerSchema = z
  .object({
    email: emailSchema,
    password: requiredString(8, VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH(8)),
    confirmPassword: requiredString(8, "Confirm password"),
    terms: z.boolean().refine((val) => val === true, {
      message: VALIDATION_MESSAGES.TERMS_REQUIRED,
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: VALIDATION_MESSAGES.PASSWORDS_NOT_MATCH,
    path: ["confirmPassword"],
  });

export const emailPasswordSchema = z.object({
  email: emailSchema,
  password: requiredString(8, VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH(8)),
});

export const restoreSchema = z.object({
  email: emailSchema,
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type EmailPasswordInput = z.infer<typeof emailPasswordSchema>;
export type RestoreInput = z.infer<typeof restoreSchema>;
