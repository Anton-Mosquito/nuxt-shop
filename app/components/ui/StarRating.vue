<script setup lang="ts">
import type { StarRatingProps } from "~/types";

const {
  rating = 0,
  maxStars = 5,
  size = "16px",
  interactive = false,
} = defineProps<StarRatingProps>();

const modelValue = defineModel<number>({ default: 0 });

const currentRating = computed(() => (interactive ? modelValue.value : rating));
const filledStars = computed(() => Math.floor(currentRating.value));
const hasHalfStar = computed(() => currentRating.value % 1 >= 0.5);
const emptyStars = computed(
  () => maxStars - filledStars.value - (hasHalfStar.value ? 1 : 0)
);

const hoverRating = ref(0);

const handleStarClick = (star: number) => {
  if (!interactive) return;
  modelValue.value = star;
};

const handleStarHover = (star: number) => {
  if (!interactive) return;
  hoverRating.value = star;
};

const handleMouseLeave = () => {
  if (!interactive) return;
  hoverRating.value = 0;
};

const displayRating = computed(() => {
  if (interactive && hoverRating.value > 0) {
    return hoverRating.value;
  }
  return currentRating.value;
});

const displayFilledStars = computed(() => Math.floor(displayRating.value));
</script>

<template>
  <div
    class="flex gap-1 text-black"
    :class="{ 'cursor-pointer': interactive }"
    :role="!interactive ? 'img' : undefined"
    :aria-label="
      !interactive ? `Rating: ${rating} out of ${maxStars}` : undefined
    "
    @mouseleave="handleMouseLeave"
  >
    <!-- Display mode (non-interactive) with half stars -->
    <template v-if="!interactive">
      <Icon
        v-for="i in filledStars"
        :key="`filled-${i}`"
        class="text-black leading-none"
        name="ic:baseline-star"
        :size="size"
        aria-hidden="true"
      />

      <Icon
        v-if="hasHalfStar"
        class="text-black opacity-50 leading-none"
        name="ic:baseline-star-half"
        :size="size"
        aria-hidden="true"
      />

      <Icon
        v-for="i in emptyStars"
        :key="`empty-${i}`"
        class="text-gray-300 leading-none"
        name="ic:baseline-star-border"
        :size="size"
        aria-hidden="true"
      />
    </template>

    <!-- Interactive mode (clickable, no half stars) -->
    <template v-else>
      <button
        v-for="i in maxStars"
        :key="i"
        type="button"
        class="p-0 border-none bg-transparent cursor-pointer leading-none transition-transform duration-150 ease-out hover:scale-110 focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2 focus-visible:rounded-sm"
        :class="[i <= displayFilledStars ? 'text-black' : 'text-gray-300']"
        :style="{ fontSize: size }"
        :aria-label="`Rate ${i} out of ${maxStars} stars`"
        @click="handleStarClick(i)"
        @mouseenter="handleStarHover(i)"
      >
        <Icon
          class="pointer-events-none"
          :name="
            i <= displayFilledStars
              ? 'ic:baseline-star'
              : 'ic:baseline-star-border'
          "
          :size="size"
          aria-hidden="true"
        />
      </button>
    </template>
  </div>
</template>
