<script setup lang="ts">
import type { Product } from "~/types";

interface Props {
  products: Product[];
}

type SlideItem = Pick<Product, "id" | "name" | "price" | "images">;

const { products } = defineProps<Props>();
const config = useRuntimeConfig();
const currentSlide = ref(0);
const sliderRef = ref<HTMLDivElement | null>(null);

const slides = computed<SlideItem[]>(() =>
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

const goToProduct = (id: number) => {
  navigateTo(`/catalog/${id}`);
};
</script>

<template>
  <div class="slider">
    <div ref="sliderRef" class="slider__container">
      <div
        v-for="{ id, name, price, images } in slides"
        :key="id"
        class="slider__slide"
        :style="{
          backgroundImage: `url(${config.public.image_url}${images?.[0]})`,
        }"
      >
        <div class="slider__content">
          <h2 class="slider__title">{{ name }}</h2>
          <p class="slider__price">$ {{ price }}</p>
          <UiButton variant="outline" size="medium" @click="goToProduct(id)">
            Go to
          </UiButton>
        </div>
      </div>
    </div>

    <div class="slider__dots">
      <button
        v-for="({ id }, index) in slides"
        :key="`dot-${id}`"
        :class="{ 'slider__dot--active': currentSlide === index }"
        :aria-label="`Go to slide ${index + 1}`"
        class="slider__dot"
        @click="scrollToSlide(index)"
      />
    </div>
  </div>
</template>

<style scoped>
.slider {
  position: relative;
  width: 100%;
  margin-bottom: 64px;
}

.slider__container {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.slider__container::-webkit-scrollbar {
  display: none;
}

.slider__slide {
  flex: 0 0 100%;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  min-height: 500px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 80px;
  border-radius: 8px;
}

.slider__content {
  max-width: 500px;
  color: #fff;
  text-align: left;
}

.slider__title {
  font-size: 48px;
  font-weight: 400;
  margin-bottom: 16px;
  line-height: 1.2;
}

.slider__price {
  font-size: 32px;
  margin-bottom: 32px;
}

.slider__dots {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 10;
}

.slider__dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #fff;
  background: transparent;
  cursor: pointer;
  transition: background 0.3s;
  padding: 0;
}

.slider__dot--active {
  background: #fff;
}

@media (max-width: 768px) {
  .slider__slide {
    min-height: 400px;
    padding: 40px 24px;
  }

  .slider__title {
    font-size: 32px;
  }

  .slider__price {
    font-size: 24px;
  }
}
</style>
