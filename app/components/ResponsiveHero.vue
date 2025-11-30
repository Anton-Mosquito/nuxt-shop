<!-- components/ResponsiveHero.vue -->
<script setup lang="ts">
const props = defineProps<{
  mobileImage: string;
  tabletImage: string;
  desktopImage: string;
  title: string;
  description: string;
}>();
</script>

<template>
  <section class="relative h-[60vh] md:h-[80vh] overflow-hidden">
    <!-- Background Picture with art direction -->
    <NuxtPicture
      :src="desktopImage"
      :img-attrs="{
        class: 'w-full h-full object-cover',
        alt: 'Hero background',
      }"
      width="1920"
      height="1080"
      format="webp,avif"
      quality="85"
      sizes="mobile:100vw tablet:100vw desktop:100vw"
      :modifiers="{
        mobile: {
          src: mobileImage,
          width: 768,
          height: 1024,
        },
        tablet: {
          src: tabletImage,
          width: 1024,
          height: 768,
        },
      }"
      preload
    />

    <!-- Overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"
    ></div>

    <!-- Content -->
    <div class="absolute inset-0 flex items-center">
      <div class="container mx-auto px-4 md:px-6 lg:px-8">
        <div class="max-w-2xl text-white">
          <h1 class="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
            {{ title }}
          </h1>
          <p class="text-lg md:text-xl mb-8 leading-relaxed">
            {{ description }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <button
              class="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
            >
              Розпочати
            </button>
            <button
              class="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg font-semibold transition-colors"
            >
              Дізнатись більше
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
