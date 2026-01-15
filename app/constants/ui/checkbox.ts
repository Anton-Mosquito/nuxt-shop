export const CHECKBOX_VARIANT_OPTIONS = {
  DEFAULT: "default",
  PRIMARY: "primary",
} as const;

export const CHECKBOX_SIZE_OPTIONS = {
  SM: "sm",
  MD: "md",
  LG: "lg",
} as const;

export const CHECKBOX_DEFAULTS = {
  variant: CHECKBOX_VARIANT_OPTIONS.DEFAULT,
  size: CHECKBOX_SIZE_OPTIONS.MD,
  disabled: false,
} as const;

export type CheckboxVariant =
  (typeof CHECKBOX_VARIANT_OPTIONS)[keyof typeof CHECKBOX_VARIANT_OPTIONS];
export type CheckboxSize =
  (typeof CHECKBOX_SIZE_OPTIONS)[keyof typeof CHECKBOX_SIZE_OPTIONS];
