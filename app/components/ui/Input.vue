<script setup lang="ts">
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/utils/cn";
import type { InputProps as BaseInputProps } from "~/types";

const inputVariants = cva(
  "w-full py-3 border-none bg-transparent text-base font-normal text-[var(--color-black)] outline-none transition-colors duration-200 ease-in-out placeholder:font-normal placeholder:text-[var(--color-dark-gray)] disabled:opacity-50 disabled:cursor-not-allowed [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
  {
    variants: {
      variant: {
        default:
          "border-b border-solid border-[var(--color-gray)] focus:border-[var(--color-black)]",
        search:
          "bg-[#f5f5f5] py-[10px] px-[12px] pl-[36px] rounded-[6px] border-none placeholder:text-[#999]",
        form: "border border-solid border-[var(--color-gray)] rounded-[4px] px-[12px] py-[12px] bg-[var(--color-white)] text-sm hover:enabled:border-[var(--color-dark-gray)] focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(0,0,0,0.05)] disabled:bg-[#f5f5f5] disabled:opacity-60",
      },
      hasIcon: {
        true: "pl-[36px]",
      },
      error: {
        true: "",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        error: true,
        class: "border-b-[#d32f2f]",
      },
      {
        variant: "form",
        error: true,
        class: "border-[#d32f2f] focus:border-[#d32f2f]",
      },
    ],
    defaultVariants: {
      variant: "default",
    },
  }
);

type InputVariants = VariantProps<typeof inputVariants>;

interface Props extends Omit<BaseInputProps, "variant"> {
  variant?: InputVariants["variant"];
}

const {
  type = "text",
  variant = "default",
  disabled = false,
  required = false,
  autocomplete,
  placeholder,
  label,
  icon,
  error,
} = defineProps<Props>();

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

const wrapperVariants = cva("flex flex-col gap-1 w-full", {
  variants: {
    variant: {
      default: "",
      search: "max-w-[320px]",
      form: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
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
        <Icon :name="showPassword ? 'ic:baseline-visibility-off' : 'ic:baseline-visibility'" size="20" />
      </button>
    </div>
  </div>
</template>
