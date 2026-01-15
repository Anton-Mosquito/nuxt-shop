<script setup lang="ts">
import type { AddFavoriteProps } from "~/types";
import { cn } from "~/utils/cn";
import { addFavoriteVariants } from "~/components/ui/variants";
import { ADD_FAVORITE_DEFAULT } from "~/constants";

const {
  id,
  isShown = ADD_FAVORITE_DEFAULT.isShown,
  variant = ADD_FAVORITE_DEFAULT.variant,
} = defineProps<AddFavoriteProps>();
const { isFavorite, toggleFavorite } = useWishlist();
</script>

<template>
  <button
    v-show="isShown || isFavorite(id)"
    :class="cn(addFavoriteVariants({ variant, active: isFavorite(id) }))"
    :aria-pressed="isFavorite(id)"
    @click.stop.prevent="() => toggleFavorite(id)"
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
        :key="isFavorite(id) ? 'filled' : 'outline'"
        :name="
          isFavorite(id)
            ? 'ic:baseline-favorite'
            : 'ic:baseline-favorite-border'
        "
        :size="variant === 'card' ? 18 : 20"
      />
    </Transition>
  </button>
</template>
