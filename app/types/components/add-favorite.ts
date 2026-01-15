import type { AddFavoriteVariants } from "~/components/ui/variants";

export interface AddFavoriteProps {
  id: number;
  isShown?: boolean;
  variant?:  AddFavoriteVariants["variant"];
}

