<!-- components/UserAvatar.vue -->
<script setup lang="ts">
const props = defineProps<{
  src?: string | null;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl";
}>();

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
  xl: "w-24 h-24",
};

const sizePixels = {
  sm: 32,
  md: 48,
  lg: 64,
  xl: 96,
};

const imageError = ref(false);

// Ініціали для fallback
const initials = computed(() => {
  const names = props.alt.split(" ");
  return names
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
});
</script>

<template>
  <div
    class="rounded-full overflow-hidden flex items-center justify-center"
    :class="[sizeClasses[size || 'md']]"
  >
    <!-- Image -->
    <NuxtImg
      v-if="src && !imageError"
      :src="src"
      :alt="alt"
      :width="sizePixels[size || 'md']"
      :height="sizePixels[size || 'md']"
      format="webp"
      quality="90"
      class="w-full h-full object-cover"
      @error="imageError = true"
    />

    <!-- Fallback - Initials -->
    <div
      v-else
      class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 text-white font-bold"
      :class="{
        'text-xs': size === 'sm',
        'text-sm': size === 'md',
        'text-lg': size === 'lg',
        'text-2xl': size === 'xl',
      }"
    >
      {{ initials }}
    </div>
  </div>
</template>
