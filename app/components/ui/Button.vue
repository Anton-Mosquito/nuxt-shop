<script setup lang="ts">
import { cn } from "~/utils/cn";
import type { ButtonProps } from "~/types";
import { buttonVariants } from "~/components/ui/variants";
import { BUTTON_DEFAULTS } from "~/constants";

const {
  variant = BUTTON_DEFAULTS.VARIANT,
  size = BUTTON_DEFAULTS.SIZE,
  disabled = BUTTON_DEFAULTS.DISABLED,
  block = BUTTON_DEFAULTS.BLOCK,
  type = BUTTON_DEFAULTS.TYPE,
} = defineProps<ButtonProps>();
</script>

<template>
  <button
    :class="cn(buttonVariants({ variant, size, block }))"
    :disabled="disabled"
    :type="type"
  >
    <slot />
  </button>
</template>
