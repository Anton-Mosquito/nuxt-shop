<script setup lang="ts">
import { API_ENDPOINTS } from "~/constants";
definePageMeta({
  middleware: ["authenticated"],
});

const { data: orderData } = await useFetch<GetOrdersResponse>(
  () => API_ENDPOINTS.ORDERS
);
</script>

<template>
  <div class="container mx-auto px-4 py-12 md:pb-24 max-w-[1240px]">
    <h1 class="text-center text-[28px] font-medium mb-12">My Orders</h1>

    <div class="flex gap-8 border-b border-[#E5E5E5] mb-8">
      <button
        type="button"
        class="pb-3 text-lg font-normal border-b border-black text-black transition-colors px-1"
      >
        Orders
      </button>
    </div>

    <div class="w-full">
      <div
        class="grid grid-cols-[1fr_1.5fr_1.5fr_0.5fr] gap-4 pb-4 border-b border-black text-black text-base font-normal"
      >
        <div>Order Number</div>
        <div>Date</div>
        <div>Status</div>
        <div>Total</div>
      </div>

      <div v-if="orderData && orderData.length > 0">
        <div
          v-for="order in orderData"
          :key="order.id"
          class="grid grid-cols-[1fr_1.5fr_1.5fr_0.5fr] gap-4 py-6 border-b border-[#E5E5E5] text-[#7D7D7D] text-base"
        >
          <div>{{ order.id }}</div>
          <NuxtTime
            class="text-sm text-gray-700"
            :datetime="order.date"
            locale="uk-UA"
            year="numeric"
            month="long"
            day="numeric"
            hour="2-digit"
            minute="2-digit"
          />
          <div>{{ order.status }}</div>
          <div>$ {{ order.total.toFixed(2) }}</div>
        </div>
      </div>
      <div v-else class="text-center py-10 text-[#7D7D7D]">
        You haven't placed any orders yet.
      </div>
    </div>
  </div>
</template>
