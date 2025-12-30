<script setup lang="ts">
import type { AddFavoriteProps} from "~/types";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/utils/cn";

const buttonVariants = cva(
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

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface Props extends Omit<AddFavoriteProps, "variant"> {
  variant?: ButtonVariants["variant"];
}

const { id, isShown = false, variant = "card" } = defineProps<Props>();
const favoriteStore = useFavoriteStore();
</script>

<template>
  <button
    v-show="isShown || favoriteStore.isFavorite(id)"
    :class="cn(buttonVariants({ variant, active: favoriteStore.isFavorite(id) }))"
    :aria-pressed="favoriteStore.isFavorite(id)"
    @click.stop.prevent="() => favoriteStore.toggleFavorite(id)"
  >
    <Transition
      mode="out-in"
      enter-active-class="transition-all duration-[180ms] ease-out inline-flex"
      leave-active-class="transition-all duration-[180ms] ease-in inline-flex"
      enter-from-class="opacity-0 scale-85"
      enter-to-class="opacity-100 scale-100"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-85"
    >
      <Icon
        :key="favoriteStore.isFavorite(id) ? 'filled' : 'outline'"
        :name="favoriteStore.isFavorite(id) ? 'mdi:heart' : 'mdi:heart-outline'"
        :size="variant === 'card' ? 18 : 20"
      />
    </Transition>
  </button>
</template>
