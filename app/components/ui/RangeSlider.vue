<script setup lang="ts">
import type {
  RangeSliderProps,
  RangeSliderEmits,
} from "~/types/components/ui/range-slider";

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

const emit = defineEmits<RangeSliderEmits>();

const localMinValue = ref(min);
const localMaxValue = ref(max);

watch(
  () => min,
  (newVal) => {
    localMinValue.value = newVal;
  }
);

watch(
  () => max,
  (newVal) => {
    localMaxValue.value = newVal;
  }
);

const minPercent = computed(() => {
  return ((localMinValue.value - min) / (max - min)) * 100;
});

const maxPercent = computed(() => {
  return ((localMaxValue.value - min) / (max - min)) * 100;
});

const formatter = computed(() => {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: fractionDigits,
    });
  } catch {
    return {
      format: (v: number) => String(v),
    } as Intl.NumberFormat;
  }
});

const formattedMin = computed(() =>
  formatter.value.format(localMinValue.value)
);
const formattedMax = computed(() =>
  formatter.value.format(localMaxValue.value)
);

const updateMinValue = (event: Event) => {
  const value = Number((event.target as HTMLInputElement).value);
  if (value <= localMaxValue.value - step) {
    localMinValue.value = value;
    emit("update:min-value", value);
  }
};

const updateMaxValue = (event: Event) => {
  const value = Number((event.target as HTMLInputElement).value);
  if (value >= localMinValue.value + step) {
    localMaxValue.value = value;
    emit("update:max-value", value);
  }
};
</script>

<template>
  <div class="range-slider">
    <div v-if="label" class="range-slider__label">{{ label }}</div>
    <div class="range-slider__container">
      <div
        class="range-slider__track"
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
        :value="localMinValue"
        class="range-slider__input range-slider__input--min"
        @input="updateMinValue"
      />
      <input
        type="range"
        :min="min"
        :max="max"
        :step="step"
        :value="localMaxValue"
        class="range-slider__input range-slider__input--max"
        @input="updateMaxValue"
      />
    </div>
    <div
      :class="[
        'range-slider__values',
        'range-slider__values--below',
        `range-slider__values--${spacing}`,
        { 'range-slider__values--bold': bold },
      ]"
    >
      Price: {{ formattedMin }} - {{ formattedMax }}
    </div>
  </div>
</template>

<style scoped>
.range-slider {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.range-slider__label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.range-slider__values {
  font-size: 14px;
  color: #666;
  text-align: left;
}

.range-slider__values--below {
  /* container marker for below-positioned values */
  display: block;
}

.range-slider__values--small {
  margin-top: 4px;
}

.range-slider__values--medium {
  margin-top: 8px;
}

.range-slider__values--large {
  margin-top: 12px;
}

.range-slider__values--bold {
  font-weight: 700;
  color: #333;
}

.range-slider__container {
  position: relative;
  height: 40px;
  display: flex;
  align-items: center;
}

.range-slider__track {
  position: absolute;
  height: 4px;
  background: #3b82f6;
  border-radius: 2px;
  pointer-events: none;
  z-index: 1;
}

.range-slider__input {
  position: absolute;
  width: 100%;
  height: 4px;
  background: transparent;
  pointer-events: none;
  -webkit-appearance: none;
  appearance: none;
}

.range-slider__input::-webkit-slider-track {
  width: 100%;
  height: 4px;
  background: #e5e7eb;
  border-radius: 2px;
}

.range-slider__input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  background: #3b82f6;
  border: 2px solid #fff;
  border-radius: 50%;
  cursor: pointer;
  pointer-events: all;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.range-slider__input::-webkit-slider-thumb:hover {
  transform: scale(1.1);
}

.range-slider__input::-webkit-slider-thumb:active {
  transform: scale(0.95);
}

.range-slider__input::-moz-range-track {
  width: 100%;
  height: 4px;
  background: #e5e7eb;
  border-radius: 2px;
}

.range-slider__input::-moz-range-thumb {
  width: 18px;
  height: 18px;
  background: #3b82f6;
  border: 2px solid #fff;
  border-radius: 50%;
  cursor: pointer;
  pointer-events: all;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.range-slider__input::-moz-range-thumb:hover {
  transform: scale(1.1);
}

.range-slider__input::-moz-range-thumb:active {
  transform: scale(0.95);
}

.range-slider__input--max {
  z-index: 3;
}

.range-slider__input--min {
  z-index: 2;
}
</style>
