<script setup lang="ts">
import type { AvatarProps } from "~/types";
import {
  AVATAR_SIZE_CLASSES,
  AVATAR_SIZE_PIXELS,
  AVATAR_TEXT_SIZE,
  AVATAR_DEFAULTS,
} from "~/constants";

const {
  src = AVATAR_DEFAULTS.SRC,
  alt,
  size = AVATAR_DEFAULTS.SIZE,
} = defineProps<AvatarProps>();

const imageError = ref(false);

const initials = computed(() =>
  alt
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
);
</script>

<template>
  <div
    class="rounded-full overflow-hidden flex items-center justify-center"
    :class="AVATAR_SIZE_CLASSES[size]"
  >
    <NuxtImg
      v-if="src && !imageError"
      :src="src"
      :alt="alt"
      :width="AVATAR_SIZE_PIXELS[size]"
      :height="AVATAR_SIZE_PIXELS[size]"
      format="webp"
      quality="90"
      class="w-full h-full object-cover"
      @error="imageError = true"
    />

    <div
      v-else
      class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 text-white font-bold"
      :class="AVATAR_TEXT_SIZE[size]"
    >
      {{ initials }}
    </div>
  </div>
</template>
