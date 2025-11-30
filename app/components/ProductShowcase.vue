<!-- components/ProductShowcase.vue -->
<script setup lang="ts">
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: {
    square: string; // для mobile
    portrait: string; // для tablet
    landscape: string; // для desktop
  };
}

const props = defineProps<{
  product: Product;
}>();
</script>

<template>
  <div class="bg-white rounded-xl shadow-lg overflow-hidden">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
      <!-- Product Image -->
      <div class="relative aspect-square lg:aspect-auto">
        <NuxtPicture
          :src="product.images.landscape"
          :img-attrs="{
            class: 'w-full h-full object-cover',
            alt: product.name,
          }"
          width="800"
          height="800"
          format="webp,avif"
          quality="90"
          sizes="sm:100vw lg:50vw"
          :modifiers="{
            mobile: {
              src: product.images.square,
              width: 600,
              height: 600,
            },
            tablet: {
              src: product.images.portrait,
              width: 600,
              height: 800,
            },
          }"
        />

        <!-- Badges -->
        <div class="absolute top-4 left-4 flex flex-col gap-2">
          <span
            class="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full"
          >
            -20%
          </span>
          <span
            class="px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full"
          >
            NEW
          </span>
        </div>
      </div>

      <!-- Product Info -->
      <div class="p-6 lg:p-8 flex flex-col justify-center">
        <h2 class="text-3xl lg:text-4xl font-bold mb-4">
          {{ product.name }}
        </h2>
        <p class="text-gray-600 mb-6 leading-relaxed">
          {{ product.description }}
        </p>

        <!-- Price -->
        <div class="flex items-baseline gap-3 mb-6">
          <span class="text-4xl font-bold text-blue-600">
            {{ product.price }} грн
          </span>
          <span class="text-xl text-gray-400 line-through">
            {{ Math.round(product.price * 1.25) }} грн
          </span>
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-3">
          <button
            class="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            Купити зараз
          </button>
          <button
            class="flex-1 px-6 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg font-semibold transition-colors"
          >
            В кошик
          </button>
        </div>

        <!-- Features -->
        <ul class="mt-8 space-y-3">
          <li class="flex items-center gap-3 text-sm">
            <Icon
              name="heroicons-solid:check-circle"
              class="w-5 h-5 text-green-500 flex-shrink-0"
              aria-hidden="true"
            />
            Безкоштовна доставка по Україні
          </li>
          <li class="flex items-center gap-3 text-sm">
            <Icon
              name="heroicons-solid:check-circle"
              class="w-5 h-5 text-green-500 flex-shrink-0"
              aria-hidden="true"
            />
            Повернення протягом 14 днів
          </li>
          <li class="flex items-center gap-3 text-sm">
            <Icon
              name="heroicons-solid:check-circle"
              class="w-5 h-5 text-green-500 flex-shrink-0"
              aria-hidden="true"
            />
            Офіційна гарантія 2 роки
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
