<script setup lang="ts">
import type { StarRatingProps } from "~/types/components/ui/star-rating";

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

// Display rating calculation for interactive mode with hover
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
    class="star-rating"
    :class="{ 'star-rating--interactive': interactive }"
    @mouseleave="handleMouseLeave"
  >
    <!-- Display mode (non-interactive) with half stars -->
    <template v-if="!interactive">
      <Icon
        v-for="i in filledStars"
        :key="`filled-${i}`"
        class="star star--filled"
        :name="'mdi:star'"
        :size="size"
        aria-hidden="true"
      />

      <Icon
        v-if="hasHalfStar"
        class="star star--half"
        :name="'mdi:star-half'"
        :size="size"
        aria-hidden="true"
      />

      <Icon
        v-for="i in emptyStars"
        :key="`empty-${i}`"
        class="star star--empty"
        :name="'mdi:star-outline'"
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
        class="star-btn"
        :class="{
          'star-btn--active': i <= displayFilledStars,
          'star-btn--empty': i > displayFilledStars,
        }"
        :aria-label="`Rate ${i} out of ${maxStars} stars`"
        @click="handleStarClick(i)"
        @mouseenter="handleStarHover(i)"
      >
        <Icon
          :name="i <= displayFilledStars ? 'mdi:star' : 'mdi:star-outline'"
          :size="size"
          aria-hidden="true"
        />
      </button>
    </template>
  </div>
</template>

<style scoped>
.star-rating {
  display: flex;
  gap: 4px;
  color: var(--color-black);
}

.star {
  font-size: v-bind(size);
  line-height: 1;
}

.star--filled {
  color: var(--color-black);
}

.star--half {
  color: var(--color-black);
  opacity: 0.5;
}

.star--empty {
  color: var(--color-gray);
}

/* Interactive mode styles */
.star-rating--interactive {
  cursor: pointer;
}

.star-btn {
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: v-bind(size);
  line-height: 1;
  color: var(--color-black);
  transition: transform 0.15s ease;
}

.star-btn:hover {
  transform: scale(1.1);
}

.star-btn:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
  border-radius: 2px;
}

.star-btn--active {
  color: var(--color-black);
}

.star-btn--empty {
  color: var(--color-gray);
}
</style>
