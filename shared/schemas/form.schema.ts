import { z } from "zod";
import { optionalEmailOrEmpty } from "./fields.schema";

export const subscribeSchema = z.object({
  email: optionalEmailOrEmpty(),
});

export type SubscribeInput = z.infer<typeof subscribeSchema>;
