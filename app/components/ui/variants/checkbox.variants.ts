import { cva, type VariantProps } from "class-variance-authority";

export const checkboxVariants = cva(
  "inline-flex items-center gap-2 cursor-pointer select-none relative",
  {
    variants: {
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
);

export const checkboxBoxVariants = cva(
  "relative flex items-center justify-center shrink-0 border-2 border-[var(--color-gray)] rounded bg-white transition-all duration-200 ease-in-out peer-hover:enabled:border-[var(--color-dark-gray)] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-[var(--color-accent)] peer-focus-visible:outline-offset-2",
  {
    variants: {
      size: {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
      },
      variant: {
        default:
          "peer-checked:bg-[var(--color-black)] peer-checked:border-[var(--color-black)] peer-indeterminate:bg-[var(--color-black)] peer-indeterminate:border-[var(--color-black)] peer-checked:[&>*]:opacity-100 peer-checked:[&>*]:scale-100 peer-indeterminate:[&>*]:opacity-100 peer-indeterminate:[&>*]:scale-100",
        primary:
          "peer-checked:bg-[var(--color-accent)] peer-checked:border-[var(--color-accent)] peer-indeterminate:bg-[var(--color-accent)] peer-indeterminate:border-[var(--color-accent)] peer-checked:[&>*]:opacity-100 peer-checked:[&>*]:scale-100 peer-indeterminate:[&>*]:opacity-100 peer-indeterminate:[&>*]:scale-100",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

export const checkboxIconVariants = cva(
  "text-white opacity-0 scale-0 transition-all duration-150 ease-in-out",
  {
    variants: {
      size: {
        sm: "text-[12px]",
        md: "text-[14px]",
        lg: "text-[16px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export type CheckboxVariants = VariantProps<typeof checkboxBoxVariants>;
