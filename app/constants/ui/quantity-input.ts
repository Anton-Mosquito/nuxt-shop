export type QuantityAction = "increase" | "decrease";

export const QUANTITY_INPUT_DEFAULTS = {
  MIN: 1,
  MAX: 999,
  DISABLED: false,
  READONLY: false,
  REPEAT_DELAY: 400,
  REPEAT_INTERVAL: 120,
} as const;
