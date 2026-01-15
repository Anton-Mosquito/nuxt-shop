import type { TagVariants } from "~/components/ui/variants";

export interface TagProps {
  label: string;
  size?: TagVariants["size"];
  variant?: TagVariants["variant"];
  href?: string;
  removable?: boolean;
  tone?: TagVariants["tone"];
}

export interface TagEmits {
  remove: [label: string];
  click: [event: MouseEvent];
}
