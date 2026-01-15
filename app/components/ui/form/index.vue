<script setup lang="ts">

const { loading = false } = defineProps<{
  loading?: boolean;
}>();

const emit = defineEmits<{
  submit: [];
}>();

const handleSubmit = () => {
  if (loading) return;

  emit("submit");
};
</script>

<template>
  <form
    class="w-full"
    :class="{ 'pointer-events-none opacity-60': loading }"
    @submit.prevent="handleSubmit"
  >
    <slot />
  </form>
</template>
