import { z } from "zod";
import { emailSchema, minLength } from "./fields.schema";
import { VALIDATION_MESSAGES } from "~~/shared/constants";

export const reviewSchema = z.object({
  name: minLength("Name", 2, VALIDATION_MESSAGES.MIN_LENGTH("Name", 2)),
  email: emailSchema,
  rating: z.number().min(1, { message: VALIDATION_MESSAGES.RATING_REQUIRED }),
  comment: minLength(
    "Feedback",
    10,
    VALIDATION_MESSAGES.MIN_LENGTH("Feedback", 10)
  ).max(1000, { message: VALIDATION_MESSAGES.FEEDBACK_MAX_LENGTH }),
  saveData: z.boolean().optional(),
});

export type ReviewInput = z.infer<typeof reviewSchema>;
