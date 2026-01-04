<script setup lang="ts">
import type { DiscountToggleProps } from "~/types/components/ui/discount-toggle";

const { label = "with discount", disabled = false } =
  defineProps<DiscountToggleProps>();

const modelValue = defineModel<boolean>({ default: false });
const toggleId = useId();
</script>

<template>
  <label
    :for="toggleId"
    class="inline-flex items-center justify-between gap-3 w-full cursor-pointer select-none"
    :class="disabled ? 'opacity-50 cursor-not-allowed' : ''"
  >
    <span class="text-sm text-[var(--color-black)] leading-[1.4] flex-1">
      <slot>{{ label }}</slot>
    </span>
    <div class="relative inline-flex flex-shrink-0">
      <input
        :id="toggleId"
        v-model="modelValue"
        type="checkbox"
        :disabled="disabled"
        :aria-checked="modelValue"
        :aria-disabled="disabled"
        :aria-label="label"
        class="peer sr-only"
      />
      <span
        class="relative inline-block w-10 h-[22px] bg-[var(--color-gray)] rounded-full transition-colors duration-200 peer-checked:bg-[var(--color-accent)] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-[var(--color-accent)] peer-focus-visible:outline-offset-2"
        :class="disabled ? 'cursor-not-allowed' : 'cursor-pointer'"
      />
      <span
        class="absolute left-0.5 top-0.5 w-[18px] h-[18px] bg-white rounded-full shadow-sm transition-transform duration-150 pointer-events-none peer-checked:translate-x-[18px]"
      />
    </div>
  </label>
</template>
