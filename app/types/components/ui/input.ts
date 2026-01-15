/**
 * Input component props
 */
export interface InputProps {
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
  variant?: "default" | "search" | "form";
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  icon?: string;
  error?: string | boolean;
  autocomplete?: string;
}
