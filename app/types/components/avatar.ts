import type { AvatarSize } from "~/constants";

export interface AvatarProps {
  src?: string | null;
  alt: string;
  size?: AvatarSize;
}
