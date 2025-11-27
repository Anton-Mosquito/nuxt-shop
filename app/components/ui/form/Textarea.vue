<script setup lang="ts">
interface Props {
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
  maxlength?: number;
  resize?: "none" | "both" | "horizontal" | "vertical";
}

const props = withDefaults(defineProps<Props>(), {
  rows: 4,
  resize: "vertical",
});

const modelValue = defineModel<string>({ default: "" });

// Use VueUse to track character count
const characterCount = computed(() => modelValue.value.length);
const hasMaxLength = computed(() => props.maxlength !== undefined);
const remainingChars = computed(() =>
  hasMaxLength.value ? props.maxlength! - characterCount.value : 0
);
</script>

<template>
  <div class="form-textarea-wrapper">
    <textarea
      v-model="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :rows="rows"
      :maxlength="maxlength"
      :style="{ resize }"
      class="form-textarea"
    />
    <div v-if="hasMaxLength" class="form-textarea__counter">
      {{ remainingChars }} символів залишилось
    </div>
  </div>
</template>

<style scoped>
.form-textarea-wrapper {
  position: relative;
}

.form-textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--color-gray);
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
  line-height: 1.5;
  color: var(--color-black);
  background-color: #fff;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-textarea:hover:not(:disabled) {
  border-color: var(--color-dark-gray);
}

.form-textarea:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
}

.form-textarea:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
  opacity: 0.6;
}

.form-textarea::placeholder {
  color: var(--color-dark-gray);
  opacity: 0.6;
}

.form-textarea__counter {
  position: absolute;
  bottom: 8px;
  right: 12px;
  font-size: 11px;
  color: var(--color-dark-gray);
  pointer-events: none;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 2px 4px;
  border-radius: 2px;
}
</style>
