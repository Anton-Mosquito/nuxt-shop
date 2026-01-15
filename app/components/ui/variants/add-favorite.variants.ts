import { cva, type VariantProps } from "class-variance-authority";

export const addFavoriteVariants = cva(
  "inline-flex items-center justify-center p-0 bg-transparent border-none cursor-pointer transition-colors duration-200 ease-in-out text-[var(--color-dark-gray)] hover:text-[var(--color-accent)]",
  {
    variants: {
      variant: {
        card: "absolute top-2 right-2 z-30 w-9 h-9",
        inline: "static w-10 h-10",
      },
      active: {
        true: "text-[var(--color-accent)]",
      },
    },
    defaultVariants: {
      variant: "card",
    },
  }
);

export type AddFavoriteVariants = VariantProps<typeof addFavoriteVariants>;
