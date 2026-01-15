<script setup lang="ts">
import { cn } from "~/utils/cn";
import type { InputProps } from "~/types";
import { wrapperVariants, inputVariants } from "~/components/ui/variants";
import { INPUT_DEFAULTS } from "~/constants";

const {
  type = INPUT_DEFAULTS.type,
  variant = INPUT_DEFAULTS.variant,
  disabled = INPUT_DEFAULTS.disabled,
  required = INPUT_DEFAULTS.required,
  autocomplete,
  placeholder,
  label,
  icon,
  error,
} = defineProps<InputProps>();

const modelValue = defineModel<string | number>();
const showPassword = ref(false);

const inputType = computed(() => {
  if (type === "password" && showPassword.value) {
    return "text";
  }
  return type;
});

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<template>
  <div :class="cn(wrapperVariants({ variant }))">
    <label
      v-if="label"
      :aria-required="required"
      class="text-sm font-normal text-[var(--color-dark-gray)]"
      :class="[required && 'after:content-[&#42;] after:text-[#d32f2f]']"
    >
      {{ label }}
    </label>
    <div class="relative flex items-center w-full">
      <Icon
        v-if="icon"
        :name="icon"
        size="20"
        class="absolute left-2 text-[var(--color-dark-gray)] pointer-events-none"
      />
      <input
        v-model="modelValue"
        v-bind="$attrs"
        :type="inputType"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :autocomplete="autocomplete"
        :class="cn(inputVariants({ variant, hasIcon: !!icon, error: !!error }))"
      />
      <button
        v-if="type === 'password'"
        type="button"
        class="absolute right-0 bg-none border-none cursor-pointer p-1 inline-flex items-center justify-center text-[var(--color-dark-gray)] hover:text-[var(--color-black)] transition-colors"
        @click="togglePasswordVisibility"
      >
        <Icon
          :name="
            showPassword
              ? 'ic:baseline-visibility-off'
              : 'ic:baseline-visibility'
          "
          size="20"
        />
      </button>
    </div>
  </div>
</template>
