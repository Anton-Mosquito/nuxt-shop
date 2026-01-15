/**
 * Button variant constants
 * Should match ButtonProps variant type from ~/types/components/ui/button
 */
export const BUTTON_VARIANTS = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  OUTLINE: "outline",
} as const;

/**
 * Button size constants
 * Should match ButtonProps size type from ~/types/components/ui/button
 */
export const BUTTON_SIZES = {
  SM: "sm",
  MD: "md",
  LG: "lg",
} as const;

/**
 * Application color palette
 * Used for theming and consistent color usage
 */
export const COLORS = {
  PRIMARY: "#000000",
  SECONDARY: "#666666",
  ACCENT: "#000000",
  SUCCESS: "#10b981",
  ERROR: "#ef4444",
  WARNING: "#f59e0b",
  INFO: "#3b82f6",
} as const;

/**
 * Icon size constants (in pixels)
 * Used with @nuxt/icon component
 */
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

/**
 * Toast configuration constants
 * Defines styling and icons for different toast types
 */
export const TOAST_CONFIG = {
  success: {
    icon: "ic:baseline-check-circle",
    bgClass: "bg-green-500",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  error: {
    icon: "ic:outline-cancel",
    bgClass: "bg-red-500",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
  warning: {
    icon: "ic:outline-warning",
    bgClass: "bg-yellow-500",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  info: {
    icon: "ic:outline-info",
    bgClass: "bg-blue-500",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
} as const;

export const AVATAR_SIZE_CLASSES = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
  xl: "w-24 h-24",
} as const;

export const AVATAR_SIZE_PIXELS = {
  sm: 32,
  md: 48,
  lg: 64,
  xl: 96,
} as const;

export const AVATAR_TEXT_SIZE = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-lg",
  xl: "text-2xl",
} as const;

export const MODAL_SIZE_CLASSES = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
} as const;


export const RANGE_SIZE_CLASSES = {
  small: "mt-1",
  medium: "mt-2",
  large: "mt-3",
} as const;