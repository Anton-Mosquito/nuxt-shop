<script setup lang="ts">
const { toasts, removeToast } = useToast();

const typeConfig = {
  success: {
    icon: "ic:baseline-check-circle",
    bgClass: "bg-green-500",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  error: {
    icon: "ic:outline-cancel",
    bgClass: "bg-red-500",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
  warning: {
    icon: "ic:outline-warning",
    bgClass: "bg-yellow-500",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  info: {
    icon: "ic:outline-info",
    bgClass: "bg-blue-500",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
};
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
            <!-- Icon -->
            <div
              class="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xl"
              :class="[
                typeConfig[toast.type].iconBg,
                typeConfig[toast.type].iconColor,
              ]"
            >
              <Icon
                :name="typeConfig[toast.type].icon"
                class="w-6 h-6"
                aria-hidden="true"
              />
            </div>

            <!-- Message -->
            <div class="flex-1 pt-0.5">
              <p class="text-sm font-medium text-gray-900">
                {{ toast.message }}
              </p>
            </div>

            <!-- Close button -->
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

          <!-- Progress bar -->
          <div class="h-1 bg-gray-100">
            <div
              class="h-full animate-shrink"
              :class="typeConfig[toast.type].bgClass"
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
