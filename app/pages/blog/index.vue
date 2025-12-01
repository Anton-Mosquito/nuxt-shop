<!-- pages/blog/index.vue -->
<script setup lang="ts">
interface Post {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  readTime: number;
  popular: boolean;
}

const { data: posts } = await useFetch<Post[]>("/api/posts");

// Категоризуємо пости
const featuredPosts = computed(
  () => posts.value?.filter((p) => p.popular).slice(0, 3) || []
);

const regularPosts = computed(
  () => posts.value?.filter((p) => !p.popular) || []
);
</script>

<template>
  <div class="container mx-auto p-6">
    <h1 class="text-4xl font-bold mb-8">Блог</h1>

    <!-- Featured posts - WITH prefetch (користувачі часто кликають) -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-6">Популярні статті</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <NuxtLink
          v-for="post in featuredPosts"
          :key="post.id"
          :to="`/blog/${post.slug}`"
          prefetch
          class="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
        >
          <div class="p-6">
            <span class="text-xs font-semibold text-blue-600 uppercase">
              {{ post.category }}
            </span>
            <h3
              class="text-xl font-bold mt-2 mb-3 group-hover:text-blue-600 transition-colors"
            >
              {{ post.title }}
            </h3>
            <p class="text-gray-600 text-sm mb-4">
              {{ post.excerpt }}
            </p>
            <div
              class="flex items-center justify-between text-sm text-gray-500"
            >
              <span>{{ post.readTime }} хв читання</span>
              <span
                class="text-blue-600 group-hover:translate-x-1 transition-transform inline-block"
              >
                Читати →
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Regular posts - WITHOUT prefetch (багато постів, рідше кликають) -->
    <section>
      <h2 class="text-2xl font-bold mb-6">Всі статті</h2>
      <div class="space-y-4">
        <NuxtLink
          v-for="post in regularPosts"
          :key="post.id"
          :to="`/blog/${post.slug}`"
          :prefetch="false"
          class="flex gap-4 p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
        >
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <span class="text-xs font-semibold text-blue-600 uppercase">
                {{ post.category }}
              </span>
              <span class="text-xs text-gray-500">
                {{ post.readTime }} хв
              </span>
            </div>
            <h3 class="text-lg font-bold mb-2">{{ post.title }}</h3>
            <p class="text-gray-600 text-sm">{{ post.excerpt }}</p>
          </div>
          <svg
            class="w-5 h-5 text-gray-400 flex-shrink-0 self-center"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
