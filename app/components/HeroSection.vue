<!-- components/HeroSection.vue -->
<script setup lang="ts">
const props = defineProps<{
  title: string;
  subtitle: string;
  image: string;
  mobileImage?: string; // Окреме зображення для mobile
}>();
</script>

<template>
  <section
    class="relative h-screen flex items-center justify-center overflow-hidden"
  >
    <!-- Background Image - Desktop -->
    <div class="hidden md:block absolute inset-0">
      <NuxtImg
        :src="image"
        alt="Hero background"
        width="1920"
        height="1080"
        sizes="100vw"
        format="webp"
        quality="85"
        class="w-full h-full object-cover"
        preload
      />
    </div>

    <!-- Background Image - Mobile (якщо є окреме) -->
    <div class="md:hidden absolute inset-0">
      <NuxtImg
        :src="mobileImage || image"
        alt="Hero background mobile"
        width="768"
        height="1024"
        sizes="100vw"
        format="webp"
        quality="80"
        class="w-full h-full object-cover"
        preload
      />
    </div>

    <!-- Gradient Overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
    ></div>

    <!-- Content -->
    <div class="relative z-10 text-center text-white px-4">
      <h1 class="text-4xl md:text-6xl font-bold mb-4">
        {{ title }}
      </h1>
      <p class="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
        {{ subtitle }}
      </p>
      <button
        class="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
      >
        Дізнатися більше
      </button>
    </div>
  </section>
</template>
