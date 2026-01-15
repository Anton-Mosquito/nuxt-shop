import type { ButtonVariants } from "~/components/ui/variants";
import type { ButtonType } from "~/constants";

export interface ButtonProps {
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  disabled?: boolean;
  block?: ButtonVariants["block"];
  type?: ButtonType;
}

export type ButtonEmits = {
  click: [];
};
