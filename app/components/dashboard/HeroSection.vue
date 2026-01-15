<!-- components/HeroSection.vue -->
<script setup lang="ts">
defineProps<{
  title: string;
  subtitle: string;
  image: string;
  mobileImage?: string;
}>();
</script>

<template>
  <section
    class="relative h-screen flex items-center justify-center overflow-hidden"
  >
    <!-- Background Image with Art Direction -->
    <div class="absolute inset-0">
      <NuxtPicture
        :src="image"
        :img-attrs="{
          class: 'w-full h-full object-cover',
          alt: 'Hero background',
        }"
        width="1920"
        height="1080"
        format="webp,avif"
        quality="85"
        sizes="100vw"
        :modifiers="
          mobileImage
            ? {
                mobile: {
                  src: mobileImage,
                  width: 768,
                  height: 1024,
                },
              }
            : undefined
        "
        preload
      />
    </div>

    <div
      class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
    ></div>

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
        Know More
      </button>
    </div>
  </section>
</template>
