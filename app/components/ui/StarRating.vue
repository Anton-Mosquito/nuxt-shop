<script setup lang="ts">
interface Props {
  rating: number;
  maxStars?: number;
  size?: string;
}

const { rating, maxStars = 5, size = "16px" } = defineProps<Props>();

const filledStars = computed(() => Math.floor(rating));
const hasHalfStar = computed(() => rating % 1 >= 0.5);
const emptyStars = computed(
  () => maxStars - filledStars.value - (hasHalfStar.value ? 1 : 0)
);
</script>

<template>
  <div class="star-rating">
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
</style>
