export const INPUT_TYPE_OPTIONS = {
  TEXT: "text",
  EMAIL: "email",
  PASSWORD: "password",
  NUMBER: "number",
  TEL: "tel",
  URL: "url",
  SEARCH: "search",
} as const;

export const INPUT_VARIANT_OPTIONS = {
  DEFAULT: "default",
  SEARCH: "search",
  FORM: "form",
} as const;

export const INPUT_DEFAULTS = {
  type: INPUT_TYPE_OPTIONS.TEXT,
  variant: INPUT_VARIANT_OPTIONS.DEFAULT,
  disabled: false,
  readonly: false,
  required: false,
} as const;

export type InputType =
  (typeof INPUT_TYPE_OPTIONS)[keyof typeof INPUT_TYPE_OPTIONS];
export type InputVariant =
  (typeof INPUT_VARIANT_OPTIONS)[keyof typeof INPUT_VARIANT_OPTIONS];