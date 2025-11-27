<script setup lang="ts">
interface Props {
  loading?: boolean;
}

const { loading = false } = defineProps<Props>();

const emit = defineEmits<{ submit: [] }>();

const handleSubmit = () => {
  if (loading) return;
  emit("submit");
};
</script>

<template>
  <form
    class="ui-form"
    :class="{ 'ui-form--loading': loading }"
    @submit.prevent="handleSubmit"
  >
    <slot />
  </form>
</template>

<style scoped>
.ui-form {
  width: 100%;
}

.ui-form--loading {
  pointer-events: none;
  opacity: 0.6;
}
</style>
