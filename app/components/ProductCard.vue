<script setup lang="ts">
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
}

const props = defineProps<{
  product: Product;
}>();

const emit = defineEmits<{
  addToCart: [productId: number];
}>();

const imageLoaded = ref(false);
</script>

<template>
  <div
    class="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
  >
    <!-- Image Container -->
    <div class="relative aspect-square bg-gray-100">
      <NuxtImg
        :src="product.image"
        :alt="product.name"
        width="400"
        height="400"
        format="webp"
        quality="80"
        loading="lazy"
        placeholder
        class="w-full h-full object-cover"
        @load="imageLoaded = true"
      />

      <!-- Loading Skeleton -->
      <div
        v-if="!imageLoaded"
        class="absolute inset-0 bg-gray-200 animate-pulse"
      ></div>

      <!-- Stock Badge -->
      <div
        class="absolute top-2 right-2 px-3 py-1 rounded-full text-sm font-semibold"
        :class="
          product.inStock ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        "
      >
        {{ product.inStock ? "В наявності" : "Немає в наявності" }}
      </div>
    </div>

    <!-- Product Info -->
    <div class="p-4">
      <h3 class="text-lg font-bold mb-2">{{ product.name }}</h3>
      <div class="flex items-center justify-between">
        <span class="text-2xl font-bold text-blue-600">
          {{ product.price }} грн
        </span>
        <button
          :disabled="!product.inStock"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          @click="emit('addToCart', product.id)"
        >
          {{ product.inStock ? "Купити" : "Недоступно" }}
        </button>
      </div>
    </div>
  </div>
</template>
