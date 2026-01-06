<script setup lang="ts">
definePageMeta({
  middleware: ["authenticated"],
});

const { logout } = useAuth();

// Mock orders data
const orders = ref([
  {
    id: 1,
    date: "May 8, 2024",
    status: "Processing",
    total: 105,
  },
  {
    id: 2,
    date: "April 22, 2024",
    status: "Delivered",
    total: 250,
  },
  {
    id: 3,
    date: "March 15, 2024",
    status: "Delivered",
    total: 80,
  },
]);

const handleLogout = async () => {
  await logout();
};
</script>

<template>
  <div class="container mx-auto px-4 py-12 md:pb-24 max-w-[1240px]">
    <h1 class="text-center text-[28px] font-medium mb-12">My Account</h1>

    <!-- Custom Tabs Navigation -->
    <div class="flex gap-8 border-b border-[#E5E5E5] mb-8">
      <button
        type="button"
        class="pb-3 text-lg font-normal border-b border-black text-black transition-colors px-1"
      >
        Orders
      </button>
      <button
        type="button"
        class="pb-3 text-lg font-normal border-b border-transparent text-[#7D7D7D] hover:text-black transition-colors px-1"
        @click="handleLogout"
      >
        Logout
      </button>
    </div>

    <!-- Orders Table -->
    <div class="w-full">
      <!-- Headers -->
      <div
        class="grid grid-cols-[1fr_1.5fr_1.5fr_0.5fr] gap-4 pb-4 border-b border-black text-black text-base font-normal"
      >
        <div>Order Number</div>
        <div>Date</div>
        <div>Status</div>
        <div>Total</div>
      </div>

      <!-- Content -->
      <div v-if="orders.length > 0">
        <div
          v-for="order in orders"
          :key="order.id"
          class="grid grid-cols-[1fr_1.5fr_1.5fr_0.5fr] gap-4 py-6 border-b border-[#E5E5E5] text-[#7D7D7D] text-base"
        >
          <div>{{ order.id }}</div>
          <div>{{ order.date }}</div>
          <div>{{ order.status }}</div>
          <div>$ {{ order.total }}</div>
        </div>
      </div>
      <div v-else class="text-center py-10 text-[#7D7D7D]">
        You haven't placed any orders yet.
      </div>
    </div>
  </div>
</template>
