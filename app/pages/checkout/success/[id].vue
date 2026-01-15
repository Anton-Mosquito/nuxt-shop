<script setup lang="ts">
import { API_ENDPOINTS, ROUTES } from "~/constants";
const route = useRoute();
const orderId = String(route.params.id ?? "");

useSeoMeta({
  title: `Order #${orderId} - Confirmed`,
});

const { data: order, error } = await useFetch<GetOrderResponse>(
  `${API_ENDPOINTS.ORDERS}/${orderId}`
);

const orderTotal = computed(() => order.value?.total ?? 0);
</script>

<template>
  <div class="container mx-auto px-4 py-16 text-center max-w-3xl">
    <div v-if="error" class="text-red-500">
      <h1 class="text-2xl font-bold mb-4">Order Not Found</h1>
      <p class="text-gray-600 mb-6">
        We couldn't retrieve the order details. It might not exist or you don't
        have permission to view it.
      </p>
      <NuxtLink :to="ROUTES.HOME">
        <UiButton variant="outline">Back to Home</UiButton>
      </NuxtLink>
    </div>

    <div v-else-if="!order" class="text-gray-600">Loading order details...</div>

    <div
      v-else
      class="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
    >
      <div
        class="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <Icon name="ic:baseline-check" class="h-10 w-10" aria-hidden="true" />
      </div>

      <h1 class="text-3xl font-bold text-gray-900 mb-2">
        We received your order!
      </h1>
      <p class="text-gray-500 mb-8">
        Order #{{ order?.id }} is now being processed.
      </p>

      <div class="grid md:grid-cols-2 gap-6 text-left mb-8">
        <div class="bg-gray-50 p-6 rounded-lg">
          <h3 class="font-semibold text-gray-900 mb-4 border-b pb-2">
            Order Details
          </h3>
          <dl class="space-y-2 text-sm">
            <div class="flex justify-between">
              <dt class="text-gray-600">Order Number</dt>
              <dd class="font-medium">#{{ order?.id }}</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-gray-600">Date</dt>
              <dd class="font-medium">
                <NuxtTime
                  :datetime="order?.createdAt"
                  locale="uk-UA"
                  year="numeric"
                  month="long"
                  day="numeric"
                  hour="2-digit"
                  minute="2-digit"
                />
              </dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-gray-600">Email</dt>
              <dd class="font-medium truncate pl-2">
                {{ order?.user?.email }}
              </dd>
            </div>
          </dl>
        </div>
        <div class="bg-gray-50 p-6 rounded-lg">
          <h3 class="font-semibold text-gray-900 mb-4 border-b pb-2">
            Shipping To
          </h3>
          <address class="text-sm not-italic text-gray-600 space-y-1">
            <p class="font-medium text-gray-900">{{ order?.user?.name }}</p>
            <p>{{ order?.user?.deliveryAddress }}</p>
            <p>{{ order?.user?.phone }}</p>
          </address>
        </div>
      </div>

      <div class="text-left border rounded-lg overflow-hidden mb-8">
        <div
          class="bg-gray-50 px-6 py-3 border-b font-semibold text-sm text-gray-700"
        >
          Items Ordered
        </div>
        <div class="divide-y">
          <div
            v-for="op in order?.products ?? []"
            :key="op.productId"
            class="p-4 flex items-center justify-between hover:bg-gray-50"
          >
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 bg-gray-200 rounded overflow-hidden flex-shrink-0"
              >
                <img
                  v-if="op.product?.thumbnail"
                  :src="op.product?.thumbnail"
                  class="w-full h-full object-cover"
                />
              </div>
              <div>
                <div class="font-medium text-gray-900">
                  {{ op.product?.title }}
                </div>
                <div class="text-xs text-gray-500">Qty: {{ op.quantity }}</div>
              </div>
            </div>
            <div class="font-medium text-gray-900">
              ${{ (op.product?.final_line_price ?? 0).toFixed(2) }}
            </div>
          </div>
        </div>
        <div
          class="bg-gray-50 px-6 py-4 flex justify-between items-center border-t"
        >
          <span class="font-bold text-gray-900">Total</span>
          <span class="font-bold text-xl text-gray-900"
            >${{ (orderTotal ?? 0).toFixed(2) }}</span
          >
        </div>
      </div>

      <NuxtLink :to="ROUTES.HOME">
        <UiButton size="large" class="px-8">Continue Shopping</UiButton>
      </NuxtLink>
    </div>
  </div>
</template>
