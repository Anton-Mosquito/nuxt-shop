export interface DiscountToggleProps {
  modelValue?: boolean;
  label?: string;
}

export interface DiscountToggleEmits {
  "update:modelValue": [value: boolean];
}
