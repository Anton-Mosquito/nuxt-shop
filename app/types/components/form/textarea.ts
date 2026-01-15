import type { TextAreaResizeOption } from "~/constants";

export interface FormTextareaProps {
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
  maxlength?: number;
  resize?: TextAreaResizeOption;
}
