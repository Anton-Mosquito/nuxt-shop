<script setup lang="ts">
import type { NotificationProps } from "~/types/components";

defineProps<NotificationProps>();
</script>

<template>
  <Transition name="fade">
    <div v-if="show" :class="['notification', `notification--${variant}`]">
      <Icon v-if="icon" :name="icon" size="20" />
      <span>{{ message }}</span>
    </div>
  </Transition>
</template>

<style scoped>
.notification {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-width: 90%;
  width: auto;
}

.notification--success {
  background: #f5f5f5;
  color: var(--color-dark-gray);
}

.notification--success svg {
  color: #4caf50;
}

.notification--error {
  background: #fff3f3;
  color: #d32f2f;
}

.notification--error svg {
  color: #d32f2f;
}

.notification--info {
  background: #e3f2fd;
  color: #1976d2;
}

.notification--info svg {
  color: #1976d2;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
