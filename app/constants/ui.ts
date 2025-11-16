// UI variants
export const BUTTON_VARIANTS = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  OUTLINE: "outline",
} as const;

export const BUTTON_SIZES = {
  SM: "sm",
  MD: "md",
  LG: "lg",
} as const;

// Colors
export const COLORS = {
  PRIMARY: "#000000",
  SECONDARY: "#666666",
  ACCENT: "#000000",
  SUCCESS: "#10b981",
  ERROR: "#ef4444",
  WARNING: "#f59e0b",
  INFO: "#3b82f6",
} as const;

// Icons
export const ICON_SIZES = {
  SM: "16",
  MD: "21",
  LG: "32",
  XL: "48",
} as const;

export type ButtonVariant =
  (typeof BUTTON_VARIANTS)[keyof typeof BUTTON_VARIANTS];
export type ButtonSize = (typeof BUTTON_SIZES)[keyof typeof BUTTON_SIZES];
export type IconSize = (typeof ICON_SIZES)[keyof typeof ICON_SIZES];
