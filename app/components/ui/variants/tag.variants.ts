
import { cva, type VariantProps } from "class-variance-authority";

export const tagVariants = cva(
  "inline-flex items-center gap-2 font-medium select-none leading-none transition-colors transition-transform duration-75 truncate",
  {
    variants: {
      variant: {
        muted: "bg-gray-100 text-gray-800",
        primary: "bg-blue-100 text-blue-800",
        accent: "bg-purple-100 text-purple-800",
        success: "bg-green-100 text-green-800",
        warning: "bg-yellow-100 text-yellow-800",
        danger: "bg-red-100 text-red-800",
      },
      size: {
        sm: "px-2 py-0.5 text-xs rounded",
        md: "px-3 py-1 text-sm rounded-md",
        lg: "px-4 py-1.5 text-sm rounded-lg",
      },
      tone: {
        light: "",
        dark: "bg-opacity-20",
      },
    },
    defaultVariants: {
      variant: "muted",
      size: "md",
      tone: "light",
    },
  }
);

export type TagVariants = VariantProps<typeof tagVariants>;