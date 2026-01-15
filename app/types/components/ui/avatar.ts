import type { AVATAR_SIZE_CLASSES } from "~/constants";

export type AvatarSize = keyof typeof AVATAR_SIZE_CLASSES;

export interface AvatarProps {
  src?: string | null;
  alt: string;
  size?: AvatarSize;
}
