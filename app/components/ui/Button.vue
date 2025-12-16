<script setup lang="ts">
import type { ButtonProps } from "~/types/components/ui/button";

const {
  variant = "primary",
  size = "medium",
  disabled = false,
  block = false,
  type = "button",
} = defineProps<ButtonProps>();
</script>

<template>
  <button
    :class="[
      'ui-button',
      `ui-button--${variant}`,
      `ui-button--${size}`,
      { 'ui-button--disabled': disabled, 'ui-button--block': block },
    ]"
    :disabled="disabled"
    :type="type"
  >
    <slot />
  </button>
</template>

<style scoped>
.ui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  font-family: var(--font);
  font-size: 16px;
}

.ui-button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Sizes */
.ui-button--small {
  padding: 8px 16px;
  font-size: 13px;
}

.ui-button--medium {
  padding: 12px 24px;
  font-size: 16px;
}

.ui-button--large {
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 700;
}

/* Variants */
.ui-button--primary {
  background: var(--color-black);
  color: var(--color-white-light);
  border: 1px solid var(--color-black);
}

.ui-button--primary:hover:not(.ui-button--disabled) {
  background: color-mix(
    in srgb,
    var(--color-black) 90%,
    var(--color-white-light) 10%
  );
}

.ui-button--secondary {
  background: #f5f5f5;
  color: #000;
  border: 1px solid #e5e5e5;
}

.ui-button--secondary:hover:not(.ui-button--disabled) {
  background: #e5e5e5;
}

.ui-button--outline {
  background: transparent;
  color: var(--color-black);
  border: 1px solid var(--color-black);
}

.ui-button--outline:hover:not(.ui-button--disabled) {
  background: #fafafa;
}

/* Ghost variant (from ActionButton) */
.ui-button--ghost {
  background: transparent;
  color: var(--color-black);
  border: 1px solid var(--color-black);
}

.ui-button--ghost:hover:not(.ui-button--disabled) {
  background: color-mix(
    in srgb,
    var(--color-white-light) 90%,
    var(--color-black) 10%
  );
}

/* Accent / compact variant (small black with colored bottom accent) */
.ui-button--accent {
  background: #000;
  color: #fff;
  padding: 8px 18px;
  border-radius: 6px;
  box-shadow: 0 6px 0 rgba(9, 102, 255, 0.95);
  transform: translateY(-2px);
  border: none;
}

.ui-button--accent:hover:not(.ui-button--disabled) {
  transform: translateY(-3px);
}

/* Block / full width */
.ui-button--block {
  display: flex;
  width: 100%;
}

/* Slightly larger rounded wide buttons used for actions like "Сбросить пароль" */
.ui-button--primary.ui-button--lg.ui-button--block {
  border-radius: 6px;
  padding: 14px 28px;
}
</style>
