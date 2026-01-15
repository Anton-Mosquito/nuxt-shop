<template>
  <div class="flex flex-col lg:flex-row gap-8">
    <div class="flex-1 space-y-4">
      <div
        v-for="i in 3"
        :key="i"
        class="h-32 bg-gray-100 rounded-lg animate-pulse"
      ></div>
    </div>
    <div
      class="w-full lg:w-80 h-64 bg-gray-100 rounded-lg animate-pulse"
    ></div>
  </div>
</template>
