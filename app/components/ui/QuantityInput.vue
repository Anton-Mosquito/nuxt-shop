<script setup lang="ts">
import { QUANTITY_INPUT_DEFAULTS, type QuantityAction } from "~/constants";
import type { QuantityInputProps } from "~/types";

const {
  min = QUANTITY_INPUT_DEFAULTS.MIN,
  max = QUANTITY_INPUT_DEFAULTS.MAX,
  disabled = QUANTITY_INPUT_DEFAULTS.DISABLED,
  readonly = QUANTITY_INPUT_DEFAULTS.READONLY,
  repeatDelay = QUANTITY_INPUT_DEFAULTS.REPEAT_DELAY,
  repeatInterval = QUANTITY_INPUT_DEFAULTS.REPEAT_INTERVAL,
} = defineProps<QuantityInputProps>();

const modelValue = defineModel<number>({ default: 1 });
const localInput = ref(String(modelValue.value));

watch(modelValue, (val) => {
  if (String(val) !== localInput.value) {
    localInput.value = String(val);
  }
});

const updateValue = (val: number) => {
  if (disabled || readonly) return;

  const newValue = clamp(val, min, max);
  modelValue.value = newValue;
  localInput.value = String(newValue);
};

const onBlur = () => {
  let parsed = parseInt(localInput.value, 10);
  if (isNaN(parsed)) parsed = min;
  updateValue(parsed);
};

const decrease = () => updateValue(modelValue.value - 1);
const increase = () => updateValue(modelValue.value + 1);

const canDecrease = computed(
  () => !disabled && !readonly && modelValue.value > min
);
const canIncrease = computed(
  () => !disabled && !readonly && modelValue.value < max
);

const { start: startRepeat, stop: stopRepeat } = useRepeatable({
  onAction: (action) => (action === "increase" ? increase() : decrease()),
  delay: repeatDelay,
  interval: repeatInterval,
  disabled: () => disabled || readonly,
});

function useRepeatable(options: {
  onAction: (action: QuantityAction) => void;
  delay: number;
  interval: number;
  disabled: () => boolean;
}) {
  const currentAction = ref<QuantityAction | null>(null);

  const { pause: pauseInterval, resume: resumeInterval } = useIntervalFn(
    () => {
      if (currentAction.value) options.onAction(currentAction.value);
    },
    options.interval,
    { immediate: false }
  );

  const { start: startTimeout, stop: stopTimeout } = useTimeoutFn(
    () => {
      resumeInterval();
    },
    options.delay,
    { immediate: false }
  );

  const start = (action: QuantityAction) => {
    if (options.disabled()) return;
    currentAction.value = action;
    startTimeout();
  };

  const stop = () => {
    currentAction.value = null;
    stopTimeout();
    pauseInterval();
  };

  return { start, stop };
}
</script>

<template>
  <div
    class="flex items-center border border-gray-300 rounded-md w-[120px] h-12 bg-white transition-colors focus-within:border-primary-500"
    :class="{ 'opacity-60 cursor-not-allowed': disabled }"
  >
    <button
      type="button"
      class="w-10 h-full flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors rounded-l-md"
      :disabled="!canDecrease"
      aria-label="Decrease quantity"
      @click="decrease"
      @pointerdown.prevent="startRepeat('decrease')"
      @pointerup.prevent="stopRepeat"
      @pointercancel.prevent="stopRepeat"
      @pointerleave.prevent="stopRepeat"
    >
      <Icon name="ic:baseline-minus" size="18" aria-hidden="true" />
    </button>

    <input
      v-model="localInput"
      type="number"
      class="flex-1 w-full h-full text-center border-none bg-transparent outline-none text-sm appearance-none [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
      :min="min"
      :max="max"
      :disabled="disabled"
      :readonly="readonly"
      aria-label="Quantity"
      @blur="onBlur"
      @keydown.enter="onBlur"
    />

    <button
      type="button"
      class="w-10 h-full flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors rounded-r-md"
      :disabled="!canIncrease"
      aria-label="Increase quantity"
      @click="increase"
      @pointerdown.prevent="startRepeat('increase')"
      @pointerup.prevent="stopRepeat"
      @pointercancel.prevent="stopRepeat"
      @pointerleave.prevent="stopRepeat"
    >
      <Icon name="ic:baseline-plus" size="18" aria-hidden="true" />
    </button>
  </div>
</template>
