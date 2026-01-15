export const BUTTON_VARIANT_OPTIONS = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  OUTLINE: "outline",
  GHOST: "ghost",
  ACCENT: "accent",
} as const;

export const BUTTON_SIZE_OPTIONS = {
  SM: "small",
  MD: "medium",
  LG: "large",
} as const;

export const BUTTON_TYPE_OPTIONS = {
  BUTTON: "button",
  SUBMIT: "submit",
  RESET: "reset",
} as const;

export const BUTTON_DEFAULTS = {
  VARIANT: BUTTON_VARIANT_OPTIONS.PRIMARY,
  SIZE: BUTTON_SIZE_OPTIONS.MD,
  BLOCK: false,
  DISABLED: false,
  TYPE: BUTTON_TYPE_OPTIONS.BUTTON,
} as const;

export type ButtonVariant =
  (typeof BUTTON_VARIANT_OPTIONS)[keyof typeof BUTTON_VARIANT_OPTIONS];
export type ButtonSize =
  (typeof BUTTON_SIZE_OPTIONS)[keyof typeof BUTTON_SIZE_OPTIONS];
export type ButtonType =
  (typeof BUTTON_TYPE_OPTIONS)[keyof typeof BUTTON_TYPE_OPTIONS];
