<script setup lang="ts">
import type {
  DiscountToggleProps,
  DiscountToggleEmits,
} from "~/types/components/ui/discount-toggle";

const { modelValue = false, label = "with discount" } =
  defineProps<DiscountToggleProps>();

const emit = defineEmits<DiscountToggleEmits>();

const local = ref<boolean>(modelValue);

watch(
  () => modelValue,
  (v) => {
    local.value = !!v;
  }
);

watch(local, (v) => emit("update:modelValue", v));
</script>

<template>
  <label class="discount-toggle">
    <span class="discount-toggle__label">{{ label }}</span>
    <input
      v-model="local"
      type="checkbox"
      class="discount-toggle__input"
      aria-label="filter by discount"
    />
    <span class="discount-toggle__switch" />
  </label>
</template>

<style scoped>
.discount-toggle {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
  width: 100%;
}

.discount-toggle__label {
  font-size: 14px;
  color: #222;
  cursor: pointer;
  flex: 1 1 auto;
}

/* keep input accessible but visually hidden */
.discount-toggle__input {
  position: absolute !important;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}

.discount-toggle__switch {
  width: 40px;
  height: 22px;
  background: #e5e7eb;
  border-radius: 999px;
  position: relative;
  transition: background 0.18s ease, box-shadow 0.18s ease;
  flex: 0 0 auto;
  cursor: pointer;
}

.discount-toggle__switch::after {
  content: "";
  position: absolute;
  left: 3px;
  top: 3px;
  width: 16px;
  height: 16px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  transition: transform 0.15s ease;
}

.discount-toggle__input:checked + .discount-toggle__switch {
  background: #3b82f6;
}

.discount-toggle__input:checked + .discount-toggle__switch::after {
  transform: translateX(18px);
}

/* focus-visible outline for keyboard users */
.discount-toggle__input:focus + .discount-toggle__switch {
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.18);
}
</style>
