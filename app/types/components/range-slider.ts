import type { RangeSliderSpacing } from "~/constants";

export interface RangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  minValue: number;
  maxValue: number;
  locale?: string;
  currency?: string;
  bold?: boolean;
  spacing?: RangeSliderSpacing;
  fractionDigits?: number;
  label?: string;
}

export type RangeSliderEmits = {
  "update:min-value": [value: number];
  "update:max-value": [value: number];
};
