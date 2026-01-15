<script setup lang="ts">
import { cn } from "~/utils/cn";
import type { CheckboxProps } from "~/types";
import {
  checkboxVariants,
  checkboxBoxVariants,
  checkboxIconVariants,
} from "~/components/ui/variants";
import { CHECKBOX_DEFAULTS } from "~/constants";

const {
  size = CHECKBOX_DEFAULTS.size,
  variant = CHECKBOX_DEFAULTS.variant,
  disabled = CHECKBOX_DEFAULTS.disabled,
  label,
} = defineProps<CheckboxProps>();

const modelValue = defineModel<boolean>({ default: false });
const checkboxId = useId();
</script>

<template>
  <label :for="checkboxId" :class="cn(checkboxVariants({ disabled }))">
    <input
      :id="checkboxId"
      v-model="modelValue"
      type="checkbox"
      :disabled="disabled"
      class="peer absolute opacity-0 w-0 h-0"
    />
    <span :class="cn(checkboxBoxVariants({ size, variant }))">
      <Icon
        name="ic:baseline-check"
        :class="cn(checkboxIconVariants({ size }))"
      />
    </span>
    <span
      v-if="label || $slots.default"
      class="text-sm text-[var(--color-black)] leading-[1.4]"
    >
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>
