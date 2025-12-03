<!-- components/ToastContainer.vue -->
<script setup lang="ts">
interface Toast {
  id: string;
  type: "success" | "error" | "warning" | "info";
  message: string;
  duration?: number;
}

const toasts = ref<Toast[]>([]);

function addToast(toast: Omit<Toast, "id">) {
  const id = Math.random().toString(36).substr(2, 9);
  const newToast = { ...toast, id };

  toasts.value.push(newToast);

  // Auto remove after duration
  setTimeout(() => {
    removeToast(id);
  }, toast.duration || 3000);

  return id;
}

function removeToast(id: string) {
  const index = toasts.value.findIndex((t) => t.id === id);
  if (index > -1) {
    toasts.value.splice(index, 1);
  }
}

// Експортуємо для використання globally
defineExpose({ addToast });

// Provide для використання в дочірніх компонентах
provide("toast", { addToast });

const typeConfig = {
  success: {
    icon: "heroicons-solid:check-circle",
    bgClass: "bg-green-500",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  error: {
    icon: "heroicons-outline:x-circle",
    bgClass: "bg-red-500",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
  warning: {
    icon: "heroicons-outline:exclamation-triangle",
    bgClass: "bg-yellow-500",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  info: {
    icon: "heroicons-outline:information-circle",
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
                name="heroicons-outline:x-mark"
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
