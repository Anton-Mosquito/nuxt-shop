<script setup lang="ts">
interface Props {
  images: string[];
  alt: string;
  solid?: boolean; // when true, indicator is a continuous line without gaps
}

const props = defineProps<Props>();
const images = props.images;
const alt = props.alt;
const solid = props.solid ?? false;
const config = useRuntimeConfig();
const selectedImage = ref(0);

// pointer / touch swipe support
const pointerStartX = ref<number | null>(null);
const swipeThreshold = 40; // px

const selectImage = (index: number) => {
  if (index < 0) index = 0;
  if (index > images.length - 1) index = images.length - 1;
  selectedImage.value = index;
};

const onPointerDown = (e: PointerEvent) => {
  pointerStartX.value = e.clientX;
};

const onPointerUp = (e: PointerEvent) => {
  if (pointerStartX.value === null) return;
  const start = pointerStartX.value;
  // ensure number
  const end = typeof e.clientX === "number" ? e.clientX : start;
  const delta = end - start;
  if (delta > swipeThreshold) {
    selectImage(selectedImage.value - 1);
  } else if (delta < -swipeThreshold) {
    selectImage(selectedImage.value + 1);
  }
  pointerStartX.value = null;
};

const onPointerCancel = () => {
  pointerStartX.value = null;
};

// Touch fallback (some browsers)
const touchStartX = ref<number | null>(null);
const onTouchStart = (e: TouchEvent) => {
  const t = e.touches && e.touches[0];
  touchStartX.value = t ? t.clientX : null;
};
const onTouchEnd = (e: TouchEvent) => {
  if (touchStartX.value === null) return;
  const changed = e.changedTouches && e.changedTouches[0];
  if (!changed) {
    touchStartX.value = null;
    return;
  }
  const delta = changed.clientX - touchStartX.value;
  if (delta > swipeThreshold) selectImage(selectedImage.value - 1);
  else if (delta < -swipeThreshold) selectImage(selectedImage.value + 1);
  touchStartX.value = null;
};
</script>

<template>
  <div class="product-gallery">
    <div class="thumbnails">
      <button
        v-for="(image, index) in images"
        :key="index"
        class="thumbnail"
        :class="{ active: selectedImage === index }"
        @click="selectImage(index)"
      >
        <img
          :src="`${config.public.image_url}${image}`"
          :alt="`${alt} ${index + 1}`"
        />
      </button>
    </div>
    <div class="main-column">
      <div
        class="main-image"
        @pointerdown="onPointerDown"
        @pointerup="onPointerUp"
        @pointercancel="onPointerCancel"
        @touchstart.passive="onTouchStart"
        @touchend.passive="onTouchEnd"
      >
        <img
          :src="`${config.public.image_url}${images[selectedImage]}`"
          :alt="alt"
        />
      </div>

      <!-- Linear indicator -->
      <div class="indicator" :class="{ solid: solid }">
        <button
          v-for="(_, index) in images"
          :key="index"
          :aria-label="`Перейти до зображення ${index + 1}`"
          class="indicator-segment"
          :class="{ active: selectedImage === index }"
          @click="selectImage(index)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-gallery {
  display: flex;
  gap: 24px;
}

.thumbnails {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.main-column {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.thumbnail {
  width: 80px;
  height: 80px;
  border: 1px solid var(--color-gray);
  background: #f9f9f9;
  cursor: pointer;
  padding: 8px;
  transition: border-color 0.2s;
}

.thumbnail:hover {
  border-color: var(--color-accent);
}

.thumbnail.active {
  border-color: var(--color-accent);
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.main-image {
  flex: 1;
  background: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.main-image img {
  max-width: 100%;
  max-height: 500px;
  object-fit: contain;
}

/* Linear indicator */
.indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  padding: 16px 0;
}

.indicator.solid {
  gap: 0;
}

.indicator.solid .indicator-segment {
  border-radius: 0;
  max-width: none;
}

.indicator-segment {
  height: 3px;
  flex: 1;
  max-width: 80px;
  background-color: #e5e5e5;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  padding: 0;
}

.indicator-segment:hover:not(.active) {
  background-color: #c9c9c9;
}

.indicator-segment.active {
  background-color: #c19a6b;
}

@media (max-width: 768px) {
  .product-gallery {
    flex-direction: column-reverse;
  }

  .thumbnails {
    flex-direction: row;
    overflow-x: auto;
  }

  .thumbnail {
    width: 60px;
    height: 60px;
  }
}
</style>
