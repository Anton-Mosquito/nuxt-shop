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

export const AVATAR_DEFAULTS = {
  SIZE: "md",
  SRC: null
} as const;

export type AvatarSize = keyof typeof AVATAR_SIZE_CLASSES;