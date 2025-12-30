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

export type AvatarSize = keyof typeof AVATAR_SIZE_CLASSES;

export interface AvatarProps {
  src?: string | null;
  alt: string;
  size?: AvatarSize;
}
