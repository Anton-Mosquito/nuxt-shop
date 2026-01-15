export const TAG_VARIANT_OPTIONS = {
  MUTED: "muted",
  PRIMARY: "primary",
  ACCENT: "accent",
  SUCCESS: "success",
  WARNING: "warning",
  DANGER: "danger",
} as const;

export const TAG_SIZE_OPTIONS = {
  SM: "sm",
  MD: "md",
  LG: "lg",
} as const;

export const TAG_TONE_OPTIONS = {
  LIGHT: "light",
  DARK: "dark",
} as const;

export const TAG_DEFAULTS = {
  variant: TAG_VARIANT_OPTIONS.MUTED,
  size: TAG_SIZE_OPTIONS.MD,
  tone: TAG_TONE_OPTIONS.LIGHT,
} as const;

export type TagVariant =
  (typeof TAG_VARIANT_OPTIONS)[keyof typeof TAG_VARIANT_OPTIONS];
export type TagSize =
  (typeof TAG_SIZE_OPTIONS)[keyof typeof TAG_SIZE_OPTIONS];
export type TagTone =
  (typeof TAG_TONE_OPTIONS)[keyof typeof TAG_TONE_OPTIONS];