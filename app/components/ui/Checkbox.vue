<script setup lang="ts">
import type { CheckboxProps } from "~/types/components/ui/checkbox";

const props = withDefaults(defineProps<CheckboxProps>(), {
  size: "md",
  variant: "default",
});

const modelValue = defineModel<boolean>({ default: false });

const checkboxId = useId();

const sizeClasses = computed(
  () =>
    ({
      sm: "checkbox--sm",
      md: "checkbox--md",
      lg: "checkbox--lg",
    }[props.size])
);
</script>

<template>
  <label
    :for="checkboxId"
    class="checkbox"
    :class="[
      sizeClasses,
      `checkbox--${variant}`,
      { 'checkbox--disabled': disabled },
    ]"
  >
    <input
      :id="checkboxId"
      v-model="modelValue"
      type="checkbox"
      :disabled="disabled"
      class="checkbox__input"
    />
    <span class="checkbox__box">
      <Icon name="mdi:check" class="checkbox__icon" />
    </span>
    <span v-if="label || $slots.default" class="checkbox__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<style scoped>
.checkbox {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  position: relative;
}

.checkbox--disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.checkbox__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.checkbox__box {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 2px solid var(--color-gray);
  border-radius: 4px;
  background-color: #fff;
  transition: all 0.2s ease;
}

/* Sizes */
.checkbox--sm .checkbox__box {
  width: 16px;
  height: 16px;
}

.checkbox--md .checkbox__box {
  width: 20px;
  height: 20px;
}

.checkbox--lg .checkbox__box {
  width: 24px;
  height: 24px;
}

.checkbox--sm .checkbox__icon {
  font-size: 12px;
}

.checkbox--md .checkbox__icon {
  font-size: 14px;
}

.checkbox--lg .checkbox__icon {
  font-size: 16px;
}

.checkbox__icon {
  opacity: 0;
  color: #fff;
  transform: scale(0);
  transition: all 0.15s ease;
}

.checkbox__label {
  font-size: 14px;
  color: var(--color-black);
  line-height: 1.4;
}

/* Hover state */
.checkbox:not(.checkbox--disabled):hover .checkbox__box {
  border-color: var(--color-dark-gray);
}

/* Focus state */
.checkbox__input:focus-visible + .checkbox__box {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* Checked state - default variant */
.checkbox--default .checkbox__input:checked + .checkbox__box {
  background-color: var(--color-black);
  border-color: var(--color-black);
}

/* Checked state - primary variant */
.checkbox--primary .checkbox__input:checked + .checkbox__box {
  background-color: var(--color-accent);
  border-color: var(--color-accent);
}

.checkbox__input:checked + .checkbox__box .checkbox__icon {
  opacity: 1;
  transform: scale(1);
}

/* Indeterminate state (optional, for future use) */
.checkbox__input:indeterminate + .checkbox__box {
  background-color: var(--color-black);
  border-color: var(--color-black);
}

.checkbox__input:indeterminate + .checkbox__box .checkbox__icon {
  opacity: 1;
  transform: scale(1);
}
</style>
