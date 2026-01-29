<script setup lang="ts">
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import type { ModalProps, ModalEmits } from "~/types";
import { MODAL_SIZE_CLASSES, MODAL_DEFAULT_CLASSES } from "~/constants";

const {
  persistent = MODAL_DEFAULT_CLASSES.PERSISTENT,
  size = MODAL_DEFAULT_CLASSES.MD,
} = defineProps<ModalProps>();

const modelValue = defineModel<boolean>({ default: false });
const emit = defineEmits<ModalEmits>();
const titleId = useId();

useBodyScrollLock(modelValue);

const modalRef = useTemplateRef("modalRef");
const { activate, deactivate } = useFocusTrap(modalRef);

watch(
  modelValue,
  async (val) => {
    if (val) {
      await nextTick();
      activate();
    } else {
      deactivate();
    }
  },
  { immediate: true }
);

function close() {
  if (persistent) return;

  modelValue.value = false;
  emit("close");
}

onMounted(() => {
  useEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape" && modelValue.value) {
      close();
    }
  });
});
</script>

<template>
  <Teleport defer to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="title ? titleId : undefined"
      >
        <div
          class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          aria-hidden="true"
          @click="close"
        ></div>

        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 scale-95 translate-y-4 sm:translate-y-0"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100 scale-100 translate-y-0"
            leave-to-class="opacity-0 scale-95 translate-y-4 sm:translate-y-0"
          >
            <div
              v-if="modelValue"
              ref="modalRef"
              class="relative w-full transform rounded-lg bg-white text-left shadow-xl transition-all"
              :class="MODAL_SIZE_CLASSES[size]"
              @click.stop
            >
              <div
                v-if="title || $slots.header"
                class="flex items-center justify-between border-b px-6 py-4"
              >
                <slot name="header">
                  <h3
                    :id="titleId"
                    class="text-lg font-semibold leading-6 text-gray-900"
                  >
                    {{ title }}
                  </h3>
                </slot>

                <button
                  v-if="!persistent"
                  type="button"
                  class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  aria-label="Close"
                  @click="close"
                >
                  <Icon
                    name="ic:baseline-close"
                    class="h-6 w-6"
                    aria-hidden="true"
                  />
                </button>
              </div>

              <div class="p-6">
                <slot />
              </div>

              <div
                v-if="$slots.footer"
                class="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse sm:px-6 rounded-b-lg gap-3"
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
