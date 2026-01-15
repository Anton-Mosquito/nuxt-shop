export const TEXT_AREA_RESIZE_OPTIONS = {
  NONE: "none",
  BOTH: "both",
  HORIZONTAL: "horizontal",
  VERTICAL: "vertical",
} as const;

export const TEXT_AREA_DEFAULTS = {
  ROWS: 4,
  RESIZE: TEXT_AREA_RESIZE_OPTIONS.VERTICAL,
  PLACEHOLDER: "",
  DISABLED: false,
  REQUIRED: false,
  MAXLENGTH: undefined,
};

export type TextAreaResizeOption =
  (typeof TEXT_AREA_RESIZE_OPTIONS)[keyof typeof TEXT_AREA_RESIZE_OPTIONS];
