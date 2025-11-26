<script setup lang="ts">
interface Props {
  type?: "text" | "email" | "password" | "tel" | "number" | "url";
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  autocomplete?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
});

const modelValue = defineModel<string | number>({ default: "" });
</script>

<template>
  <input
    v-model="modelValue"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :required="required"
    :autocomplete="autocomplete"
    class="form-input"
  />
</template>

<style scoped>
.form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--color-gray);
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
  color: var(--color-black);
  background-color: #fff;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-input:hover:not(:disabled) {
  border-color: var(--color-dark-gray);
}

.form-input:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
}

.form-input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
  opacity: 0.6;
}

.form-input::placeholder {
  color: var(--color-dark-gray);
  opacity: 0.6;
}

/* Remove number input spinners */
.form-input[type="number"]::-webkit-inner-spin-button,
.form-input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.form-input[type="number"] {
  appearance: textfield;
  -moz-appearance: textfield;
}
</style>
