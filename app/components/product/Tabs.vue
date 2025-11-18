<script setup lang="ts">
const activeTab = ref<"description" | "reviews">("description");

const setActiveTab = (tab: "description" | "reviews") => {
  activeTab.value = tab;
};
</script>

<template>
  <div class="product-tabs">
    <div class="tabs-nav">
      <button
        class="tab-btn"
        :class="{ active: activeTab === 'description' }"
        @click="setActiveTab('description')"
      >
        Описание
      </button>
      <button
        class="tab-btn"
        :class="{ active: activeTab === 'reviews' }"
        @click="setActiveTab('reviews')"
      >
        Отзывы (2)
      </button>
    </div>

    <div class="tabs-content">
      <div v-if="activeTab === 'description'" class="tab-panel">
        <slot name="description" />
      </div>
      <div v-if="activeTab === 'reviews'" class="tab-panel">
        <slot name="reviews" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-tabs {
  margin-top: 60px;
}

.tabs-nav {
  display: flex;
  border-bottom: 1px solid var(--color-gray);
  margin-bottom: 32px;
}

.tab-btn {
  padding: 12px 24px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: var(--color-dark-gray);
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
  position: relative;
  top: 1px;
}

.tab-btn:hover {
  color: var(--color-black);
}

.tab-btn.active {
  color: var(--color-black);
  border-bottom-color: var(--color-accent);
}

.tab-panel {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
