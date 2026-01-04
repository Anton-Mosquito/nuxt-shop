<script setup lang="ts">
import type { Product } from "~/types";

interface Props {
  products: Product[];
}

const { products } = defineProps<Props>();
const { currentSlide, sliderRef, slides, scrollToSlide, goToProduct } =
  useSlider();

function useSlider() {
  const currentSlide = ref(0);
  const sliderRef = ref<HTMLDivElement | null>(null);

  const slides = computed<Pick<Product, "id" | "name" | "price" | "images">[]>(
    () =>
      products.slice(0, 3).map(({ id, name, price, images }) => ({
        id,
        name,
        price,
        images,
      }))
  );

  const scrollToSlide = (index: number) => {
    const slider = sliderRef.value;
    const slide = slider?.children[index];

    slide?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    currentSlide.value = index;
  };

  const goToProduct = (id: number) => navigateTo(`/catalog/${id}`);

  return {
    currentSlide,
    sliderRef,
    slides,
    scrollToSlide,
    goToProduct,
  };
}
</script>

<template>
  <div class="relative w-full mb-16">
    <div
      ref="sliderRef"
      class="flex overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    >
      <div
        v-for="{ id, name, price, images } in slides"
        :key="id"
        class="flex-none w-full snap-start snap-always min-h-[400px] md:min-h-[500px] relative overflow-hidden bg-cover bg-center bg-no-repeat flex items-center justify-start py-10 px-6 md:p-20 rounded-lg"
      >
        <NuxtImg
          :src="useImageUrl(images?.[0], '/placeholder-1600x500.png')"
          provider="ipx"
          format="webp"
          quality="80"
          width="1600"
          height="500"
          class="absolute inset-0 w-full h-full object-cover z-0"
          loading="lazy"
        />
        <div class="max-w-[500px] text-white text-left relative z-10">
          <h2 class="text-[32px] md:text-5xl font-normal mb-4 leading-tight">
            {{ name }}
          </h2>
          <p class="text-2xl md:text-[32px] mb-8">$ {{ price }}</p>
          <UiButton variant="outline" size="medium" @click="goToProduct(id)">
            Go to
          </UiButton>
        </div>
      </div>
    </div>

    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
      <button
        v-for="({ id }, index) in slides"
        :key="`dot-${id}`"
        :class="[
          'w-3 h-3 rounded-full border-2 border-white bg-transparent cursor-pointer transition-colors duration-300 p-0',
          currentSlide === index ? 'bg-white' : '',
        ]"
        :aria-label="`Go to slide ${index + 1}`"
        @click="scrollToSlide(index)"
      />
    </div>
  </div>
</template>
