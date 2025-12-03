<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl";
  persistent?: boolean; // не закривається при кліку поза модалкою
}>();

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  close: [];
}>();

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

function close() {
  if (!props.persistent) {
    emit("update:modelValue", false);
    emit("close");
  }
}

// Блокуємо скрол body коли модалка відкрита
watch(
  () => props.modelValue,
  (isOpen) => {
    if (import.meta.client) {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }
  }
);

// Закриття на Escape
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape" && props.modelValue) {
      close();
    }
  };
  document.addEventListener("keydown", handleEscape);

  onUnmounted(() => {
    document.removeEventListener("keydown", handleEscape);
    document.body.style.overflow = "";
  });
});
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 overflow-y-auto"
        @click.self="close"
      >
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm"></div>

        <!-- Modal container -->
        <div class="flex min-h-full items-center justify-center p-4">
          <Transition
            enter-active-class="transition-all duration-300"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition-all duration-200"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div
              v-if="modelValue"
              class="relative bg-white rounded-lg shadow-2xl w-full"
              :class="sizeClasses[size || 'md']"
              @click.stop
            >
              <!-- Header -->
              <div
                v-if="title || $slots.header"
                class="flex items-center justify-between p-6 border-b"
              >
                <slot name="header">
                  <h3 class="text-xl font-bold text-gray-900">
                    {{ title }}
                  </h3>
                </slot>

                <button
                  v-if="!persistent"
                  class="text-gray-400 hover:text-gray-600 transition-colors"
                  @click="close"
                >
                  <Icon
                    name="heroicons-outline:x-mark"
                    class="w-6 h-6"
                    aria-hidden="true"
                  />
                </button>
              </div>

              <!-- Body -->
              <div class="p-6">
                <slot />
              </div>

              <!-- Footer -->
              <div
                v-if="$slots.footer"
                class="flex items-center justify-end gap-3 p-6 border-t bg-gray-50"
              >
                <slot name="footer" :close="close" />
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
