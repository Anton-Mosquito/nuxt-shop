import { cva, type VariantProps } from "class-variance-authority";

export const inputVariants = cva(
  "w-full py-3 border-none bg-transparent text-base font-normal text-[var(--color-black)] outline-none transition-colors duration-200 ease-in-out placeholder:font-normal placeholder:text-[var(--color-dark-gray)] disabled:opacity-50 disabled:cursor-not-allowed [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
  {
    variants: {
      variant: {
        default:
          "border-b border-solid border-[var(--color-gray)] focus:border-[var(--color-black)]",
        search:
          "bg-[#f5f5f5] py-[10px] px-[12px] pl-[36px] rounded-[6px] border-none placeholder:text-[#999]",
        form: "border border-solid border-[var(--color-gray)] rounded-[4px] px-[12px] py-[12px] bg-[var(--color-white)] text-sm hover:enabled:border-[var(--color-dark-gray)] focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(0,0,0,0.05)] disabled:bg-[#f5f5f5] disabled:opacity-60",
      },
      hasIcon: {
        true: "pl-[36px]",
      },
      error: {
        true: "",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        error: true,
        class: "border-b-[#d32f2f]",
      },
      {
        variant: "form",
        error: true,
        class: "border-[#d32f2f] focus:border-[#d32f2f]",
      },
    ],
    defaultVariants: {
      variant: "default",
    },
  }
);

export const wrapperVariants = cva("flex flex-col gap-1 w-full", {
  variants: {
    variant: {
      default: "",
      search: "max-w-[320px]",
      form: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type InputVariants = VariantProps<typeof inputVariants>;
