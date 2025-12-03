<!-- components/Comment.vue -->
<script setup lang="ts">
interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
  editedAt?: string;
  replies?: Comment[];
}

const props = defineProps<{
  comment: Comment;
  depth?: number;
}>();

const maxDepth = 3;
const showReplies = ref(false);

// Визначити чи коментар був редагований
const isEdited = computed(() => {
  if (!props.comment.editedAt) return false;

  const created = new Date(props.comment.createdAt).getTime();
  const edited = new Date(props.comment.editedAt).getTime();

  return edited - created > 60_000; // більше 1 хв після створення
});
</script>

<template>
  <div class="flex gap-3" :class="{ 'ml-8': depth && depth > 0 }">
    <!-- Avatar -->
    <UserAvatar
      :src="comment.author.avatar"
      :alt="comment.author.name"
      size="md"
      class="flex-shrink-0"
    />

    <!-- Content -->
    <div class="flex-1 bg-gray-50 rounded-lg p-4">
      <!-- Header -->
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-2">
          <span class="font-semibold text-gray-900">
            {{ comment.author.name }}
          </span>

          <!-- Timestamp -->
          <span class="text-sm text-gray-500">
            <NuxtTime
              :datetime="comment.createdAt"
              type="relative"
              locale="uk-UA"
            />
          </span>

          <!-- Edited badge -->
          <span
            v-if="isEdited"
            class="text-xs text-gray-400 italic"
            :title="`Редаговано ${new Date(comment.editedAt).toLocaleString(
              'uk-UA'
            )}`"
          >
            (редаговано)
          </span>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-2">
          <button class="text-sm text-gray-500 hover:text-gray-700">
            <Icon
              name="heroicons-outline:dots-horizontal"
              class="w-4 h-4"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      <!-- Comment text -->
      <p class="text-gray-700 text-sm leading-relaxed">
        {{ comment.content }}
      </p>

      <!-- Reply button -->
      <div class="mt-3 flex items-center gap-4">
        <button class="text-sm text-blue-600 hover:text-blue-700 font-medium">
          Відповісти
        </button>

        <button
          v-if="comment.replies && comment.replies.length > 0"
          class="text-sm text-gray-600 hover:text-gray-700"
          @click="showReplies = !showReplies"
        >
          {{ showReplies ? "Сховати" : "Показати" }} відповіді ({{
            comment.replies.length
          }})
        </button>
      </div>

      <!-- Nested replies -->
      <div v-if="showReplies && comment.replies" class="mt-4 space-y-3">
        <Comment
          v-for="reply in comment.replies"
          :key="reply.id"
          :comment="reply"
          :depth="(depth || 0) + 1"
        />
      </div>
    </div>
  </div>
</template>
