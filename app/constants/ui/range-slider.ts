export const RANGE_SIZE_CLASSES = {
  small: "mt-1",
  medium: "mt-2",
  large: "mt-3",
} as const;

export const RANGE_SLIDER_SPACING = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
} as const;

export const RANGE_DEFAULTS = {
  MIN: 0,
  MAX: 1000,
  STEP: 10,
  LOCALE: "en-US",
  CURRENCY: "USD",
  BOLD: false,
  SPACING: "medium",
  FRACTION_DIGITS: 0,
  LABEL: "",
} as const;

export type RangeSliderSpacing =
  (typeof RANGE_SLIDER_SPACING)[keyof typeof RANGE_SLIDER_SPACING];
