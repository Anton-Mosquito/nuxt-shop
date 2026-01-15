export type ModalSize = "sm" | "md" | "lg" | "xl";

export interface ModalProps {
  modelValue: boolean;
  title?: string;
  size?: ModalSize;
  persistent?: boolean;
}

export interface ModalEmits {
  "update:modelValue": [value: boolean];
  close: [];
}
