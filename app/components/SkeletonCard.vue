<!-- components/SkeletonCard.vue -->
<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
    <!-- Image skeleton -->
    <div class="w-full h-48 bg-gray-200"></div>

    <!-- Content skeleton -->
    <div class="p-4 space-y-3">
      <div class="h-4 bg-gray-200 rounded w-3/4"></div>
      <div class="h-4 bg-gray-200 rounded w-full"></div>
      <div class="h-4 bg-gray-200 rounded w-5/6"></div>

      <div class="flex items-center justify-between pt-4">
        <div class="h-6 bg-gray-200 rounded w-20"></div>
        <div class="h-10 bg-gray-200 rounded w-24"></div>
      </div>
    </div>
  </div>
</template>
