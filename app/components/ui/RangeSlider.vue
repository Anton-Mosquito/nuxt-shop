<script setup lang="ts">
import type { RangeSliderProps } from "~/types";
import { RANGE_SIZE_CLASSES } from "~/constants";

const {
  min = 0,
  max = 1000,
  step = 10,
  locale = "en-US",
  currency = "USD",
  bold = false,
  spacing = "medium",
  fractionDigits = 0,
  label = "",
} = defineProps<RangeSliderProps>();

const minValue = defineModel<number>("minValue", { required: true });
const maxValue = defineModel<number>("maxValue", { required: true });

const minPercent = computed(() => ((minValue.value - min) / (max - min)) * 100);
const maxPercent = computed(() => ((maxValue.value - min) / (max - min)) * 100);

const formatter = computed(() => {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: fractionDigits,
    });
  } catch {
    return { format: (v: number) => String(v) } as Intl.NumberFormat;
  }
});

const formattedMin = computed(() => formatter.value.format(minValue.value));
const formattedMax = computed(() => formatter.value.format(maxValue.value));

const onInputMin = (event: Event) => {
  const val = Number((event.target as HTMLInputElement).value);
  const limit = maxValue.value - step;
  minValue.value = clamp(val, min, limit);
};

const onInputMax = (event: Event) => {
  const val = Number((event.target as HTMLInputElement).value);
  const limit = minValue.value + step;
  maxValue.value = clamp(val, limit, max);
};
</script>

<template>
  <div class="flex flex-col gap-3">
    <div v-if="label" class="text-sm font-medium text-gray-800">
      {{ label }}
    </div>

    <div class="relative flex h-10 items-center">
      <div
        class="absolute z-10 h-1 rounded-sm bg-blue-500 pointer-events-none"
        :style="{
          left: `${minPercent}%`,
          width: `${maxPercent - minPercent}%`,
        }"
      />

      <input
        type="range"
        :min="min"
        :max="max"
        :step="step"
        :value="minValue"
        class="range-slider__input z-20"
        aria-label="Minimum price"
        @input="onInputMin"
      />

      <input
        type="range"
        :min="min"
        :max="max"
        :step="step"
        :value="maxValue"
        class="range-slider__input z-30"
        aria-label="Maximum price"
        @input="onInputMax"
      />
    </div>

    <div
      class="text-sm text-gray-600 text-left"
      :class="[
        {
          'font-bold text-gray-800': bold,
        },
        RANGE_SIZE_CLASSES[spacing],
      ]"
    >
      Price: {{ formattedMin }} - {{ formattedMax }}
    </div>
  </div>
</template>

<style scoped>
.range-slider__input {
  @apply absolute h-1 w-full appearance-none bg-transparent pointer-events-none;
}

/* Webkit (Chrome, Safari, Edge) */
.range-slider__input::-webkit-slider-thumb {
  @apply h-[18px] w-[18px] appearance-none rounded-full bg-blue-500 border-2 border-white cursor-pointer pointer-events-auto shadow-sm transition-transform duration-200 ease-out;
}

.range-slider__input::-webkit-slider-thumb:hover {
  @apply scale-110;
}

.range-slider__input::-webkit-slider-thumb:active {
  @apply scale-95;
}

/* Firefox */
.range-slider__input::-moz-range-thumb {
  @apply h-[18px] w-[18px] appearance-none rounded-full bg-blue-500 border-2 border-white cursor-pointer pointer-events-auto shadow-sm transition-transform duration-200 ease-out;
}

.range-slider__input::-moz-range-thumb:hover {
  @apply scale-110;
}

.range-slider__input::-moz-range-thumb:active {
  @apply scale-95;
}
</style>
