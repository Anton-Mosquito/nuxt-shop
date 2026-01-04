export type CheckboxSize = "sm" | "md" | "lg";
export type CheckboxVariant = "default" | "primary";

export interface CheckboxProps {
  label?: string;
  disabled?: boolean;
  size?: CheckboxSize;
  variant?: CheckboxVariant;
}
