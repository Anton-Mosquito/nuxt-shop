<!-- components/BeforeAfterSlider.vue -->
<script setup lang="ts">
const props = defineProps<{
  beforeImage: string;
  afterImage: string;
  label?: string;
}>();

const sliderPosition = ref(50);
const isDragging = ref(false);
const containerRef = ref<HTMLElement | null>(null);

function handleMouseDown() {
  isDragging.value = true;
}

function handleMouseUp() {
  isDragging.value = false;
}

function handleMouseMove(event: MouseEvent) {
  if (!isDragging.value || !containerRef.value) return;

  const rect = containerRef.value.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const percentage = (x / rect.width) * 100;
  sliderPosition.value = Math.max(0, Math.min(100, percentage));
}

function handleTouchMove(event: TouchEvent) {
  if (!containerRef.value) return;

  const rect = containerRef.value.getBoundingClientRect();
  const touch = event.touches?.[0] ?? event.changedTouches?.[0];
  if (!touch) return;

  const x = touch.clientX - rect.left;
  const percentage = (x / rect.width) * 100;
  sliderPosition.value = Math.max(0, Math.min(100, percentage));
}

onMounted(() => {
  document.addEventListener("mouseup", handleMouseUp);
  document.addEventListener("mousemove", handleMouseMove);
});

onUnmounted(() => {
  document.removeEventListener("mouseup", handleMouseUp);
  document.removeEventListener("mousemove", handleMouseMove);
});
</script>

<template>
  <div
    ref="containerRef"
    class="relative aspect-video overflow-hidden rounded-xl cursor-ew-resize select-none"
    @mousedown="handleMouseDown"
    @touchstart="isDragging = true"
    @touchmove="handleTouchMove"
    @touchend="isDragging = false"
  >
    <!-- After Image (Background) -->
    <div class="absolute inset-0">
      <NuxtPicture
        :src="afterImage"
        :img-attrs="{
          class: 'w-full h-full object-cover',
          alt: 'After',
        }"
        width="1200"
        height="675"
        format="webp"
        quality="90"
      />

      <div
        class="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white text-sm font-bold rounded"
      >
        ПІСЛЯ
      </div>
    </div>

    <!-- Before Image (Overlay with clip) -->
    <div
      class="absolute inset-0 overflow-hidden"
      :style="{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }"
    >
      <NuxtPicture
        :src="beforeImage"
        :img-attrs="{
          class: 'w-full h-full object-cover',
          alt: 'Before',
        }"
        width="1200"
        height="675"
        format="webp"
        quality="90"
      />

      <div
        class="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-sm font-bold rounded"
      >
        ДО
      </div>
    </div>

    <!-- Slider Handle -->
    <div
      class="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
      :style="{ left: `${sliderPosition}%` }"
    >
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center"
      >
        <svg
          class="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 9l4-4 4 4m0 6l-4 4-4-4"
          />
        </svg>
      </div>
    </div>

    <!-- Label -->
    <div
      v-if="label"
      class="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/70 text-white text-sm rounded-full"
    >
      {{ label }}
    </div>
  </div>
</template>
