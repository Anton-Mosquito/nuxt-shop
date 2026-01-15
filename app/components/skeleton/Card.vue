<template>
  <div class="relative flex flex-col gap-6 w-full no-underline animate-pulse">
    <div
      class="relative aspect-square rounded-lg w-full max-w-full overflow-hidden flex justify-between items-start p-4 bg-gray-200"
      role="presentation"
    >
      <div
        class="absolute inset-0 w-full h-full bg-gray-200"
        aria-hidden="true"
      />

      <div class="relative z-10 flex w-full justify-between items-start">
        <div class="h-6 w-14 bg-gray-300 rounded-md" aria-hidden="true" />
        <div class="h-9 w-9 bg-gray-300 rounded-full" aria-hidden="true" />
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <div class="h-6 w-3/4 bg-gray-200 rounded" aria-hidden="true" />
      <div class="h-6 w-1/2 bg-gray-200 rounded" aria-hidden="true" />
    </div>
  </div>
</template>
