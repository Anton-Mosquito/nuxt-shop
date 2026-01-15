<script setup lang="ts">
interface Props {
  count?: number;
}

const { count = 3 } = defineProps<Props>();
</script>

<template>
  <div class="flex flex-col gap-6 mb-10">
    <div
      v-for="i in count"
      :key="i"
      class="pb-6 border-b border-solid border-[var(--color-gray)] animate-pulse"
    >
      <div class="flex gap-3">
        <div class="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0"></div>
        <div class="flex-1">
          <div class="flex justify-between items-center mb-2">
            <div class="h-5 bg-gray-200 rounded w-32"></div>
            <div class="h-4 bg-gray-200 rounded w-24"></div>
          </div>

          <div class="flex gap-1 mb-3">
            <div
              v-for="j in 5"
              :key="j"
              class="w-5 h-5 bg-gray-200 rounded"
            ></div>
          </div>

          <div class="mt-3 space-y-2">
            <div class="h-4 bg-gray-200 rounded"></div>
            <div class="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
