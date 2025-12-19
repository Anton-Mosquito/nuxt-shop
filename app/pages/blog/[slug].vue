<script setup lang="ts">
const route = useRoute();
const { data: post } = await useFetch(`/api/posts/${route.params.slug}`);
</script>

<template>
  <div class="container mx-auto p-6 max-w-4xl">
    <NuxtErrorBoundary>
      <article>
        <!-- Hero image -->
        <NuxtPicture
          :src="post.featuredImage"
          :img-attrs="{
            alt: post.title,
            class: 'w-full h-96 object-cover rounded-xl mb-8',
          }"
          width="1200"
          height="630"
          format="webp"
          preload
        />
        <!-- Header -->
        <header class="mb-8">
          <h1 class="text-4xl font-bold mb-4">{{ post.title }}</h1>

          <div class="flex items-center gap-4 text-sm text-gray-600">
            <div class="flex items-center gap-2">
              <UserAvatar
                :src="post.author.avatar"
                :alt="post.author.name"
                size="sm"
              />
              <span>{{ post.author.name }}</span>
            </div>

            <span>•</span>

            <NuxtTime
              :datetime="post.publishedAt"
              type="relative"
              locale="uk-UA"
            />
          </div>
        </header>

        <!-- Content -->
        <div class="prose max-w-none" v-html="post.content"></div>
      </article>

      <!-- Comments with selective hydration -->
      <div class="mt-12">
        <ClientOnly>
          <NuxtIsland name="CommentsList" :props="{ postId: post.id }" />

          <template #fallback>
            <SkeletonComments />
          </template>
        </ClientOnly>
      </div>

      <template #error="{ error, clearError }">
        <ErrorBoundary
          title="Помилка завантаження статті"
          :message="error.message"
          show-details
          @retry="clearError"
        >
          <template #actions>
            <NuxtLink to="/blog" class="px-4 py-2 border rounded-lg">
              До блогу
            </NuxtLink>
          </template>
        </ErrorBoundary>
      </template>
    </NuxtErrorBoundary>
  </div>
</template>
