<script setup lang="ts">
import type { FormTextareaProps } from "~/types";

const {
  rows = 4,
  resize = "vertical",
  placeholder = "",
  disabled = false,
  required = false,
  maxlength = undefined,
} = defineProps<FormTextareaProps>();

const modelValue = defineModel<string>({ default: "" });

const debouncedValue = debouncedRef(modelValue, 300);
const characterCount = computed(() => debouncedValue.value.length);
const hasMaxLength = computed(() => maxlength !== undefined);
const remainingChars = computed(() =>
  hasMaxLength.value && maxlength !== undefined
    ? maxlength - characterCount.value
    : 0
);
</script>

<template>
  <div class="relative">
    <textarea
      v-model="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :rows="rows"
      :maxlength="maxlength"
      :style="{ resize }"
      class="w-full p-3 border border-[var(--color-gray)] rounded-md text-[14px] leading-6 color-[var(--color-black)] bg-white outline-none transition-border transition-shadow duration-200 hover:border-[var(--color-dark-gray)] focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(0,0,0,0.05)] disabled:bg-[var(--color-light-gray)] disabled:cursor-not-allowed disabled:opacity-60 placeholder:color-[var(--color-dark-gray)] placeholder:opacity-60"
    />
    <div v-if="hasMaxLength" class="absolute bottom-2 right-3 text-[11px] color-[var(--color-dark-gray)] pointer-events-none bg-white/90 px-1 py-[2px] rounded-sm">
      {{ remainingChars }} characters remaining
    </div>
  </div>
</template>