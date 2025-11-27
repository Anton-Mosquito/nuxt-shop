/**
 * Range slider component props
 */
export interface RangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  minValue: number;
  maxValue: number;
  locale?: string;
  currency?: string;
  bold?: boolean;
  spacing?: "small" | "medium" | "large";
  fractionDigits?: number;
  label?: string;
}

/**
 * Range slider component emits
 */
export type RangeSliderEmits = {
  "update:min-value": [value: number];
  "update:max-value": [value: number];
};
