<script setup lang="ts">
const model = defineModel<string>();

const { options } = defineProps<{
  options: { label: string; value: string }[];
}>();
</script>

<template>
  <div class="select-wrapper">
    <select id="wrapper-select" v-model="model">
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <Icon name="icon:bar-outline" size="12" />
  </div>
</template>

<style scoped>
.select-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;

  & select {
    width: 100%;
    padding: 15px 12px;
    border: 1px solid var(--color-gray);
    border-radius: 4px;
    margin: 0;
    appearance: none;
    background-color: var(--color-white);
    font-size: 14px;
    font-family: inherit;
    line-height: 20px;
    color: var(--color-dark);

    &:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 2px var(--color-primary-light);
    }
  }

  & span[class*="icon:bar-outline"] {
    position: absolute;
    top: 50%;
    right: 6px;
    transform: translateY(-50%);
    pointer-events: none;
    color: var(--color-dark-gray);
  }
}
</style>
