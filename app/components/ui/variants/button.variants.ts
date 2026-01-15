import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center font-semibold border rounded transition-all duration-200 font-[var(--font)] text-base disabled:opacity-60 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-black)] text-[var(--color-white-light)] border-[var(--color-black)] hover:enabled:bg-[color-mix(in_srgb,var(--color-black)_90%,var(--color-white-light)_10%)]",
        secondary:
          "bg-[#f5f5f5] text-[#000] border-[#e5e5e5] hover:enabled:bg-[#e5e5e5]",
        outline:
          "bg-transparent text-[var(--color-black)] border-[var(--color-black)] hover:enabled:bg-[#fafafa]",
        ghost:
          "bg-transparent text-[var(--color-black)] border-[var(--color-black)] hover:enabled:bg-[color-mix(in_srgb,var(--color-white-light)_90%,var(--color-black)_10%)]",
        accent:
          "bg-[#000] text-[#fff] border-none rounded-md shadow-[0_6px_0_rgba(9,102,255,0.95)] -translate-y-0.5 hover:enabled:-translate-y-1",
      },
      size: {
        small: "px-4 py-2 text-[13px]",
        medium: "px-6 py-3 text-base",
        large: "px-8 py-4 text-base font-bold",
      },
      block: {
        true: "flex w-full",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        size: "large",
        block: true,
        class: "rounded-md px-7 py-3.5",
      },
      {
        variant: "accent",
        size: "small",
        class: "px-[18px] py-2",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "medium",
      block: false,
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;