<script setup lang="ts">
const { isLoading, loadingMessage } = usePageLoader();

useBodyScrollLock(isLoading);
</script>

<template>
  <Teleport defer to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isLoading"
        id="loader"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center"
        role="alert"
        aria-live="assertive"
        aria-busy="true"
      >
        <div class="bg-white rounded-lg p-6 shadow-xl">
          <div class="flex items-center gap-3">
            <Icon
              name="ic:baseline-refresh"
              class="animate-spin h-8 w-8 text-blue-600"
              aria-hidden="true"
            />

            <div>
              <p class="font-semibold text-gray-900">
                {{ loadingMessage }}
              </p>
              <p class="text-sm text-gray-500">Please wait...</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
