<!-- pages/post/[id].vue -->
<script setup lang="ts">
const route = useRoute();
const { data: comments } = await useFetch(
  `/api/posts/${route.params.id}/comments`
);
</script>

<template>
  <div class="container mx-auto p-6 max-w-4xl">
    <!-- Post content -->

    <!-- Comments section -->
    <section class="mt-12">
      <h2 class="text-2xl font-bold mb-6">
        Коментарі ({{ comments?.length || 0 }})
      </h2>

      <div class="space-y-6">
        <Comment
          v-for="comment in comments"
          :key="comment.id"
          :comment="comment"
        />
      </div>
    </section>
  </div>
</template>
