<script setup lang="ts">
import type { SelectProps } from "~/types/components/ui/select";

const model = defineModel<string>();

const { options } = defineProps<SelectProps>();
</script>

<template>
  <div class="relative inline-block w-full">
    <select v-model="model" class="w-full py-4 pl-9 pr-3 border border-[var(--color-gray)] rounded-md m-0 appearance-none bg-[var(--color-white)] text-[var(--color-dark)] text-sm font-normal leading-5 focus:outline-none focus:border-[var(--color-primary)] focus:box-shadow-[0_0_0_2px_var(--color-primary-light)]">
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <Icon
      name="mdi:chevron-down"
      size="16"
      class="absolute top-1/2 right-2.5 transform -translate-y-1/2 pointer-events-none text-[var(--color-dark-gray)]"
      aria-hidden="true"
    />
  </div>
</template>
