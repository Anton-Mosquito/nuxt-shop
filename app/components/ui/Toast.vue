<script setup lang="ts">
import { TOAST_CONFIG } from "~/constants/ui";

const { toasts, removeToast } = useToast();
</script>

<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-50 space-y-3 pointer-events-none">
      <TransitionGroup
        enter-active-class="transition-all duration-300"
        enter-from-class="opacity-0 translate-x-full"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition-all duration-200"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 translate-x-full"
      >
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="pointer-events-auto bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden min-w-[320px] max-w-md"
        >
          <div class="flex items-start gap-3 p-4">
            <div
              class="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xl"
              :class="[
                TOAST_CONFIG[toast.type].iconBg,
                TOAST_CONFIG[toast.type].iconColor,
              ]"
            >
              <Icon
                :name="TOAST_CONFIG[toast.type].icon"
                class="w-6 h-6"
                aria-hidden="true"
              />
            </div>

            <div class="flex-1 pt-0.5">
              <p class="text-sm font-medium text-gray-900">
                {{ toast.message }}
              </p>
            </div>

            <button
              class="flex-shrink-0 text-gray-400 hover:text-gray-600"
              @click="removeToast(toast.id)"
            >
              <Icon
                name="ic:baseline-close"
                class="w-5 h-5"
                aria-hidden="true"
              />
            </button>
          </div>

          <div class="h-1 bg-gray-100">
            <div
              class="h-full animate-shrink"
              :class="TOAST_CONFIG[toast.type].bgClass"
              :style="{ animationDuration: `${toast.duration || 3000}ms` }"
            ></div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
@keyframes shrink {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}

.animate-shrink {
  animation: shrink linear forwards;
}
</style>
