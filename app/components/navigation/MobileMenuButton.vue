<script setup lang="ts">
interface Props {
  isOpen: boolean;
}

const { isOpen } = defineProps<Props>();
const emit = defineEmits<{
  toggle: [];
}>();

const ariaLabel = computed(() =>
  isOpen ? "Close navigation menu" : "Open navigation menu"
);
</script>

<template>
  <button
    class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors text-[#666] hover:text-black"
    :aria-expanded="isOpen"
    aria-controls="mobile-menu"
    :aria-label="ariaLabel"
    @click="emit('toggle')"
  >
    <Icon v-if="!isOpen" name="ic:baseline-menu" size="24" aria-hidden="true" />
    <Icon v-else name="ic:baseline-close" size="24" aria-hidden="true" />
  </button>
</template>
