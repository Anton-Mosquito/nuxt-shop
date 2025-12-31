<script setup lang="ts">
import type { QuantityInputProps } from "~/types/components/ui/quantity-input";

const {
  min = 1,
  max = 999,
  disabled = false,
  readonly = false,
  repeatDelay = 400,
  repeatInterval = 120,
} = defineProps<QuantityInputProps>();

// V-model implementation (Vue 3.3+)
const modelValue = defineModel<number>({ default: 1 });

// Local input state allows temporary empty string during typing
const localInput = ref(String(modelValue.value ?? min));

// Keep localInput in sync when external modelValue changes
watch(
  () => modelValue.value,
  (v) => {
    // Only update localInput if it's different and user hasn't left it empty intentionally
    if (String(v) !== localInput.value) {
      localInput.value = String(v);
    }
  }
);

// On user input keep the raw string to allow empty value while typing
const onInput = (e: Event) => {
  const t = e.target as HTMLInputElement;
  localInput.value = t.value;
};

// On blur sanitize and emit numeric modelValue
const onBlur = () => {
  if (disabled || readonly) return;

  let parsed = parseInt(localInput.value, 10);
  if (!isFinite(parsed) || isNaN(parsed)) parsed = min;
  if (parsed < min) parsed = min;
  if (parsed > max) parsed = max;

  modelValue.value = Math.trunc(parsed);
  // Ensure input shows the sanitized value
  localInput.value = String(modelValue.value);
};

const decrease = () => {
  if (disabled || readonly) return;
  if (modelValue.value > min) {
    modelValue.value--;
    localInput.value = String(modelValue.value);
  }
};

const increase = () => {
  if (disabled || readonly) return;
  if (modelValue.value < max) {
    modelValue.value++;
    localInput.value = String(modelValue.value);
  }
};

const canDecrease = computed(
  () => !disabled && !readonly && modelValue.value > min
);
const canIncrease = computed(
  () => !disabled && !readonly && modelValue.value < max
);

// Long-press / repeat support
let repeatTimer: ReturnType<typeof setTimeout> | null = null;
let repeatIntervalId: ReturnType<typeof setInterval> | null = null;

const startRepeat = (action: "increase" | "decrease") => {
  if (disabled || readonly) return;

  // start timeout then interval for repeat (no immediate action here)
  repeatTimer = setTimeout(() => {
    repeatIntervalId = setInterval(() => {
      if (action === "increase") increase();
      else decrease();
    }, repeatInterval);
  }, repeatDelay);
};

const stopRepeat = () => {
  if (repeatTimer) {
    clearTimeout(repeatTimer);
    repeatTimer = null;
  }
  if (repeatIntervalId) {
    clearInterval(repeatIntervalId);
    repeatIntervalId = null;
  }
};

onBeforeUnmount(() => {
  stopRepeat();
});
</script>

<template>
  <div class="quantity-input" :class="{ 'is-disabled': disabled }">
    <button
      class="quantity-btn quantity-btn--decrease"
      type="button"
      :disabled="!canDecrease"
      aria-label="Decrease quantity"
      @click="decrease"
      @pointerdown.prevent="startRepeat('decrease')"
      @pointerup.prevent="stopRepeat"
      @pointercancel.prevent="stopRepeat"
      @pointerleave.prevent="stopRepeat"
    >
      <Icon name="mdi:minus" size="18" aria-hidden="true" />
    </button>

    <input
      v-model="localInput"
      class="quantity-field"
      type="number"
      :min="min"
      :max="max"
      :disabled="disabled"
      :readonly="readonly"
      aria-label="Quantity"
      @input="onInput"
      @blur="onBlur"
    />

    <button
      class="quantity-btn quantity-btn--increase"
      type="button"
      :disabled="!canIncrease"
      aria-label="Increase quantity"
      @click="increase"
      @pointerdown.prevent="startRepeat('increase')"
      @pointerup.prevent="stopRepeat"
      @pointercancel.prevent="stopRepeat"
      @pointerleave.prevent="stopRepeat"
    >
      <Icon name="mdi:plus" size="18" aria-hidden="true" />
    </button>
  </div>
</template>

<style scoped>
.quantity-input {
  display: flex;
  align-items: center;
  border: 1px solid var(--color-gray);
  width: 120px;
  height: 48px;
  background: var(--color-white, #fff);
  transition: border-color 0.2s;
}

.quantity-input:focus-within {
  border-color: var(--color-accent);
}

.quantity-input.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.quantity-btn {
  width: 40px;
  height: 100%;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 20px;
  color: var(--color-dark-gray);
  transition: color 0.2s, background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}

.quantity-btn:hover:not(:disabled) {
  color: var(--color-black);
  background-color: var(--color-light-gray, #f5f5f5);
}

.quantity-btn:active:not(:disabled) {
  background-color: var(--color-gray);
}

.quantity-btn:disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

.quantity-field {
  flex: 1;
  border: none;
  text-align: center;
  font-size: 14px;
  outline: none;
  background: transparent;
  width: 100%;
  -moz-appearance: textfield;
  appearance: textfield;
}

/* Hide spinner buttons in number input */
.quantity-field::-webkit-outer-spin-button,
.quantity-field::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.quantity-field:disabled {
  cursor: not-allowed;
}

.quantity-field:focus {
  outline: none;
}

/* visually-hidden for screen readers */
.visually-hidden {
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
  border: 0;
  padding: 0;
  margin: -1px;
}
</style>
