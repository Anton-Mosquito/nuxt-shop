<script setup lang="ts">
interface Props {
  images: string[];
  alt: string;
  solid?: boolean; // when true, indicator is a continuous line without gaps
}

const { images, alt, solid = false } = defineProps<Props>();
const mainImageRef = useTemplateRef<HTMLDivElement>("mainImageRef");

const { selectedImage, selectImage } = useImageSwipe();

function useImageSwipe() {
  const { isSwiping, direction } = useSwipe(mainImageRef);
  const selectedImage = ref(0);

  const clampIndex = (index: number) =>
    Math.min(Math.max(index, 0), images.length - 1);

  const selectImage = (index: number) => {
    if (!images?.length) return;

    selectedImage.value = clampIndex(index);
  };

  watch(isSwiping, (newValue, oldValue) => {
    if (!(oldValue && !newValue)) return;

    const step =
      direction.value === "left" ? 1 : direction.value === "right" ? -1 : 0;

    if (!step) return;

    selectImage(selectedImage.value + step);
  });

  return {
    selectedImage,
    selectImage,
  };
}
</script>

<template>
  <div v-if="images?.length" class="flex flex-col-reverse gap-6 md:flex-row">
    <div
      class="thumbnails flex flex-row gap-4 overflow-x-auto md:flex-col md:overflow-visible [&::-webkit-scrollbar]:hidden"
      role="tablist"
      aria-label="Product thumbnails"
    >
      <button
        v-for="(image, index) in images"
        :key="index"
        class="thumbnail relative flex h-[60px] w-[60px] shrink-0 cursor-pointer items-center justify-center border bg-[#f9f9f9] p-2 transition-colors duration-200 md:h-20 md:w-20 md:shrink"
        :class="[
          selectedImage === index
            ? 'border-[var(--color-accent)]'
            : 'border-[var(--color-gray)] hover:border-[var(--color-accent)]',
        ]"
        role="tab"
        :aria-selected="selectedImage === index"
        :aria-label="`View image ${index + 1}`"
        :tabindex="selectedImage === index ? 0 : -1"
        @click="selectImage(index)"
      >
        <NuxtImg
          :src="useImageUrl(image)"
          :alt="`${alt} thumbnail ${index + 1}`"
          provider="ipx"
          format="webp"
          quality="80"
          width="160"
          height="160"
          loading="lazy"
          class="h-full w-full object-contain"
        />
      </button>
    </div>
    <div class="main-column flex w-full flex-col gap-3">
      <div
        ref="mainImageRef"
        class="main-image relative flex min-h-[400px] flex-1 touch-pan-y items-center justify-center overflow-hidden bg-[#f9f9f9]"
      >
        <Transition
          enter-active-class="transition-opacity duration-300 ease-out"
          enter-from-class="opacity-0"
          leave-active-class="transition-opacity duration-300 ease-in"
          leave-to-class="opacity-0"
          mode="out-in"
        >
          <NuxtImg
            :key="selectedImage"
            :src="useImageUrl(images[selectedImage])"
            :alt="alt"
            provider="ipx"
            format="webp"
            quality="90"
            width="1000"
            height="1000"
            sizes="sm:100vw md:80vw lg:60vw"
            class="main-image__img max-h-[500px] max-w-full select-none object-contain"
            style="-webkit-user-drag: none"
          />
        </Transition>
      </div>

      <div
        class="indicator group flex items-center justify-center py-4"
        :class="[solid ? 'gap-0 solid' : 'gap-1.5']"
      >
        <button
          v-for="(_, index) in images"
          :key="index"
          :aria-label="`Go to image ${index + 1}`"
          :aria-current="selectedImage === index"
          class="indicator-segment h-[3px] max-w-[80px] flex-1 cursor-pointer border-none p-0 transition-colors duration-300 group-[.solid]:max-w-none group-[.solid]:rounded-none"
          :class="[
            selectedImage === index
              ? 'active bg-[#c19a6b]'
              : 'bg-[#e5e5e5] hover:bg-[#c9c9c9]',
          ]"
          @click="selectImage(index)"
        />
      </div>
    </div>
  </div>
</template>
