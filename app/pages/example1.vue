<!-- pages/example.vue -->
<script setup lang="ts">
const showModal = ref(false);
const showConfirmModal = ref(false);

function handleSave() {
  console.log("Saving...");
  showModal.value = false;
}

function handleDelete() {
  console.log("Deleting...");
  showConfirmModal.value = false;
}
</script>

<template>
  <div class="container mx-auto p-6">
    <button
      class="px-4 py-2 bg-blue-600 text-white rounded-lg"
      @click="showModal = true"
    >
      Відкрити модалку
    </button>

    <!-- Simple modal -->
    <Modal v-model="showModal" title="Редагувати профіль" size="lg">
      <form class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Ім'я</label>
          <input type="text" class="w-full px-3 py-2 border rounded-lg" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <input type="email" class="w-full px-3 py-2 border rounded-lg" />
        </div>
      </form>

      <template #footer="{ close }">
        <button
          class="px-4 py-2 border rounded-lg hover:bg-gray-50"
          @click="close"
        >
          Скасувати
        </button>
        <button
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          @click="handleSave"
        >
          Зберегти
        </button>
      </template>
    </Modal>

    <!-- Confirmation modal -->
    <Modal v-model="showConfirmModal" size="sm" persistent>
      <div class="text-center">
        <div
          class="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center"
        >
          <Icon
            name="heroicons-outline:exclamation-triangle"
            class="w-8 h-8 text-red-600"
            aria-hidden="true"
          />
        </div>
        <h3 class="text-lg font-bold mb-2">Видалити елемент?</h3>
        <p class="text-gray-600 text-sm mb-6">Цю дію не можна буде скасувати</p>
      </div>

      <template #footer>
        <button
          class="px-4 py-2 border rounded-lg hover:bg-gray-50"
          @click="showConfirmModal = false"
        >
          Скасувати
        </button>
        <button
          class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          @click="handleDelete"
        >
          Видалити
        </button>
      </template>
    </Modal>
  </div>
</template>
