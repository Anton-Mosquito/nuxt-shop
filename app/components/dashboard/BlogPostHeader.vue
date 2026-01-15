<script setup lang="ts">
interface Post {
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: number;
  category: string;
  featuredImages: {
    mobile: string;
    tablet: string;
    desktop: string;
    ultrawide?: string;
  };
}

const props = defineProps<{
  post: Post;
}>();

const formattedDate = computed(() => {
  return new Date(props.post.publishedAt).toLocaleDateString("uk-UA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});
</script>

<template>
  <article class="max-w-4xl mx-auto">
    <!-- Featured Image -->
    <div
      class="relative h-64 md:h-96 lg:h-[32rem] rounded-2xl overflow-hidden mb-8"
    >
      <NuxtPicture
        :src="post.featuredImages.desktop"
        :img-attrs="{
          class: 'w-full h-full object-cover',
          alt: post.title,
        }"
        width="1200"
        height="630"
        format="webp,avif"
        quality="85"
        sizes="sm:100vw md:100vw lg:1200px"
        :modifiers="{
          mobile: {
            src: post.featuredImages.mobile,
            width: 768,
            height: 512,
          },
          tablet: {
            src: post.featuredImages.tablet,
            width: 1024,
            height: 576,
          },
          ultrawide: post.featuredImages.ultrawide
            ? {
                src: post.featuredImages.ultrawide,
                width: 2560,
                height: 720,
              }
            : undefined,
        }"
        preload
      />
      <!-- Category Badge -->
      <div class="absolute top-4 left-4">
        <span
          class="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full"
        >
          {{ post.category }}
        </span>
      </div>
    </div>

    <!-- Post Meta -->
    <div class="mb-6">
      <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
        {{ post.title }}
      </h1>
      <p class="text-lg md:text-xl text-gray-600 mb-6">
        {{ post.excerpt }}
      </p>

      <div class="flex items-center gap-4 text-sm text-gray-600">
        <div class="flex items-center gap-2">
          <UiAvatar
            :src="post.author.avatar"
            :alt="post.author.name"
            size="sm"
          />
          <span class="font-medium">{{ post.author.name }}</span>
        </div>
        <span>•</span>
        <time>{{ formattedDate }}</time>
        <span>•</span>
        <span>{{ post.readTime }} хв читання</span>
      </div>
    </div>
  </article>
</template>
