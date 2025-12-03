<!-- components/CommentsList.island.vue -->
<script setup lang="ts">
const props = defineProps<{
  postId: string;
}>();

// Завантажуємо коментарі тільки коли компонент гідратується
const { data: comments, pending } = await useLazyFetch(
  `/api/posts/${props.postId}/comments`
);

const commentCount = computed(() => comments.value?.length || 0);
</script>

<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h3 class="text-xl font-bold mb-4">Коментарі ({{ commentCount }})</h3>

    <div v-if="pending" class="space-y-4">
      <div v-for="i in 3" :key="i" class="animate-pulse">
        <div class="flex gap-3">
          <div class="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div class="flex-1 space-y-2">
            <div class="h-4 bg-gray-200 rounded w-1/4"></div>
            <div class="h-3 bg-gray-200 rounded"></div>
            <div class="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="space-y-4">
      <Comment
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
      />
    </div>
  </div>
</template>
