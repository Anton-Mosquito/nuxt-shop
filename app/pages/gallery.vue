<!-- pages/gallery.vue -->
<script setup lang="ts">
interface Image {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
  category: "nature" | "urban" | "people";
}

const images: Image[] = [
  {
    id: 1,
    src: "/images/nature1.jpg",
    alt: "Гори",
    width: 1920,
    height: 1080,
    category: "nature",
  },
  {
    id: 2,
    src: "/images/urban1.jpg",
    alt: "Місто",
    width: 1920,
    height: 1080,
    category: "urban",
  },
  {
    id: 3,
    src: "/images/people1.jpg",
    alt: "Люди",
    width: 1920,
    height: 1080,
    category: "people",
  },
  // ... додай ще 9 зображень
];

const selectedCategory = ref<"all" | "nature" | "urban" | "people">("all");

const filteredImages = computed(() => {
  if (selectedCategory.value === "all") return images;
  return images.filter((img) => img.category === selectedCategory.value);
});

const selectedImage = ref<Image | null>(null);

function openLightbox(image: Image) {
  selectedImage.value = image;
}

function closeLightbox() {
  selectedImage.value = null;
}
</script>

<template>
  <div class="container mx-auto p-6">
    <h1 class="text-4xl font-bold mb-6">Галерея зображень</h1>

    <!-- Filter -->
    <div class="flex gap-4 mb-8">
      <button
        v-for="cat in ['all', 'nature', 'urban', 'people']"
        :key="cat"
        class="px-4 py-2 rounded-lg transition-colors"
        :class="
          selectedCategory === cat
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 hover:bg-gray-200'
        "
        @click="selectedCategory = cat as any"
      >
        {{ cat === "all" ? "Всі" : cat }}
      </button>
    </div>

    <!-- Gallery Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="image in filteredImages"
        :key="image.id"
        class="group relative overflow-hidden rounded-lg cursor-pointer"
        @click="openLightbox(image)"
      >
        <!-- ✅ Оптимізоване зображення -->
        <NuxtImg
          :src="image.src"
          :alt="image.alt"
          :width="image.width"
          :height="image.height"
          sizes="sm:100vw md:50vw lg:33vw"
          format="webp"
          quality="80"
          loading="lazy"
          class="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
          placeholder
        />

        <!-- Overlay -->
        <div
          class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center"
        >
          <span
            class="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {{ image.alt }}
          </span>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <Teleport to="body">
      <div
        v-if="selectedImage"
        class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
        @click="closeLightbox"
      >
        <button
          class="absolute top-4 right-4 text-white text-4xl hover:text-gray-300"
          @click="closeLightbox"
        >
          &times;
        </button>

        <!-- Full size image -->
        <NuxtImg
          :src="selectedImage.src"
          :alt="selectedImage.alt"
          :width="selectedImage.width"
          :height="selectedImage.height"
          format="webp"
          quality="90"
          class="max-w-full max-h-full object-contain"
          @click.stop
        />

        <div class="absolute bottom-4 left-0 right-0 text-center text-white">
          <p class="text-xl font-semibold">{{ selectedImage.alt }}</p>
        </div>
      </div>
    </Teleport>
  </div>
</template>
