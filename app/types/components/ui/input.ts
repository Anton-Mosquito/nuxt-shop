/**
 * Input component props
 */
export interface InputProps {
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
  variant?: "default" | "black" | "footer" | "search";
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  icon?: string;
  error?: string | boolean;
  autocomplete?: string;
}

/**
 * Input component emits
 */
export type InputEmits = {
  "update:modelValue": [value: string];
  blur: [];
  focus: [];
};
