<script setup lang="ts">
import type { InputProps } from "~/types/components/ui/input";

const {
  type = "text",
  variant = "default",
  disabled = false,
  required = false,
} = defineProps<InputProps>();

const modelValue = defineModel<string>();
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
  <div :class="['input-wrapper', `input-wrapper--${variant}`]">
    <label
      v-if="label"
      :class="['input-label', { 'input-label--required': required }]"
    >
      {{ label }}
    </label>
    <div class="input-container">
      <Icon v-if="icon" :name="icon" size="20" class="input-icon" />
      <input
        v-model="modelValue"
        :type="inputType"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :class="[
          'input',
          `input--${variant}`,
          { 'input--with-icon': icon, 'input--error': error },
        ]"
      />
      <button
        v-if="type === 'password'"
        type="button"
        class="input-toggle"
        @click="togglePasswordVisibility"
      >
        <Icon :name="showPassword ? 'mdi:eye-off' : 'mdi:eye'" size="20" />
      </button>
    </div>
    <span v-if="error" class="input-error">{{ error }}</span>
  </div>
</template>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}

.input-label {
  font-size: 14px;
  font-weight: 400;
  color: var(--color-dark-gray);
}

.input-label--required::after {
  content: " *";
  color: #d32f2f;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.input {
  width: 100%;
  padding: 12px 0;
  border: none;
  background: none;
  font-size: 16px;
  font-weight: 400;
  color: var(--color-black);
  outline: none;
  transition: border-color 0.2s ease;
}

.input::placeholder {
  color: var(--color-dark-gray);
  font-weight: 400;
}

.input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Variant: default (gray underline) */
.input--default {
  border-bottom: 1px solid var(--color-gray);
}

.input--default:focus {
  border-bottom-color: var(--color-black);
}

/* Variant: black (black underline) */
.input--black {
  border-bottom: 2px solid var(--color-black);
}

/* Variant: footer (for email subscription in footer) */
.input--footer {
  border-bottom: 1px solid var(--color-black);
  font-size: 14px;
  padding: 6px 8px;
}

/* Variant: search (with background) */
.input--search {
  background: #f5f5f5;
  padding: 10px 12px;
  padding-left: 36px;
  border-radius: 6px;
  border: none;
}

.input--search::placeholder {
  color: #999;
}

/* With icon */
.input--with-icon {
  padding-left: 36px;
}

.input-icon {
  position: absolute;
  left: 8px;
  color: var(--color-dark-gray);
  pointer-events: none;
}

/* Password toggle button */
.input-toggle {
  position: absolute;
  right: 0;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--color-dark-gray);
  transition: color 0.2s ease;
}

.input-toggle:hover {
  color: var(--color-black);
}

/* Error state */
.input--error {
  border-bottom-color: #d32f2f !important;
}

.input-error {
  font-size: 12px;
  color: #d32f2f;
  margin-top: 4px;
}

/* Wrapper variants */
.input-wrapper--search {
  max-width: 320px;
}

.input-wrapper--footer {
  min-width: 260px;
}
</style>
