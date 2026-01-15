import type { CheckboxVariants } from "~/components/ui/variants";

export interface CheckboxProps {
  label?: string;
  disabled?: boolean;
  size?: CheckboxVariants["size"];
  variant?: CheckboxVariants["variant"];
}
