import type { InputVariants } from "~/components/ui/variants";
import type { InputType } from "~/constants";

export interface InputProps {
  type?: InputType;
  variant?: InputVariants["variant"];
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  icon?: string;
  error?: string | boolean;
  autocomplete?: string;
}