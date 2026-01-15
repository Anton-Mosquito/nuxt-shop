<script setup lang="ts">
import { cn } from "~/utils/cn";
import type { TagProps, TagEmits } from "~/types";
import { tagVariants } from "~/components/ui/variants";
import { TAG_DEFAULTS } from "~/constants";

const {
  label,
  size = TAG_DEFAULTS.size,
  variant = TAG_DEFAULTS.variant,
  removable = false,
  tone = TAG_DEFAULTS.tone,
  href = undefined,
} = defineProps<TagProps>();

const emit = defineEmits<TagEmits>();

const tagClass = computed(() => cn(tagVariants({ variant, size, tone })));
</script>

<template>
  <component
    :is="href ? 'a' : 'span'"
    :href="href"
    :class="tagClass"
    role="link"
    :aria-label="`Tag: ${label}`"
    :tabindex="href ? undefined : 0"
    @click="emit('click', $event)"
  >
    <span>{{ label }}</span>

    <button
      v-if="removable"
      type="button"
      class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-transparent border-0 cursor-pointer text-inherit text-sm p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 hover:scale-105 transition-transform duration-75"
      :aria-label="`Remove tag ${label}`"
      @click.stop.prevent="emit('remove', label)"
      @keydown.space.prevent="emit('remove', label)"
      @keydown.enter.prevent="emit('remove', label)"
    >
      &times;
    </button>
  </component>
</template>
