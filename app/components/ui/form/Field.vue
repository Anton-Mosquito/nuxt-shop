<script setup lang="ts">
import type { FormFieldProps } from "~/types";

const {
  label = "",
  error = "",
  required = false,
  hint = "",
} = defineProps<FormFieldProps>();

const fieldId = useId();
</script>

<template>
  <div class="relative">
    <label
      v-if="label"
      :for="fieldId"
      :class="[
        'block text-sm font-medium mb-2',
        error ? 'text-red-600' : 'text-gray-900',
      ]"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">
        <Icon name="ic:baseline-star" size="12" aria-hidden="true" />
      </span>
    </label>

    <div class="relative">
      <slot
        :id="fieldId"
        :error="!!error"
        :error-class="'border-red-500 ring-1 ring-red-200'"
      />
    </div>

    <div v-if="hint && !error" class="text-sm text-gray-500 mt-1">
      {{ hint }}
    </div>

    <Transition
      enter-active-class="transition-all duration-200"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div
        v-if="error"
        class="text-sm text-red-600 mt-1 font-medium absolute"
        role="alert"
      >
        {{ error }}
      </div>
    </Transition>
  </div>
</template>
