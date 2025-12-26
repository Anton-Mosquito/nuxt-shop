<script setup lang="ts">
interface Props {
  label?: string;
  error?: string;
  required?: boolean;
  hint?: string;
}

const {
  label = "",
  error = "",
  required = false,
  hint = "",
} = defineProps<Props>();

const fieldId = useId();
</script>

<template>
  <div class="form-field" :class="{ 'form-field--error': error }">
    <label v-if="label" :for="fieldId" class="form-field__label">
      {{ label }}
      <span v-if="required" class="form-field__required">
        <Icon name="mdi:asterisk" size="12" aria-hidden="true" />
      </span>
    </label>

    <div class="form-field__input">
      <slot :id="fieldId" />
    </div>

    <div v-if="hint && !error" class="form-field__hint">
      {{ hint }}
    </div>

    <Transition name="error-fade">
      <div v-if="error" class="form-field__error" role="alert">
        {{ error }}
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.form-field {
  position: relative;
  margin-bottom: 20px;
}

.form-field__label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: var(--color-black);
}

.form-field__required {
  color: var(--color-accent);
  margin-left: 2px;
}

.form-field__input {
  position: relative;
}

.form-field__hint {
  font-size: 12px;
  color: var(--color-dark-gray);
  margin-top: 4px;
}

.form-field__error {
  font-size: 12px;
  color: #dc3545;
  margin-top: 4px;
  font-weight: 500;
}

.form-field--error :deep(input),
.form-field--error :deep(textarea),
.form-field--error :deep(select) {
  border-color: #dc3545;
}

.form-field--error :deep(input:focus),
.form-field--error :deep(textarea:focus),
.form-field--error :deep(select:focus) {
  border-color: #dc3545;
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
}

/* Error fade transition */
.error-fade-enter-active,
.error-fade-leave-active {
  transition: all 0.2s ease;
}

.error-fade-enter-from {
  opacity: 0;
  transform: translateY(-4px);
}

.error-fade-leave-to {
  opacity: 0;
}
</style>
