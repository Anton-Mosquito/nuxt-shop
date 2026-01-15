<script setup lang="ts">
import { ROUTES } from "~/constants";
const props = defineProps<{ item: CartItem }>();
const { item } = toRefs(props);
const { removeItem, changeQuantity, isItemPending } = useCart();
const { localQuantity, handleUpdate, handleFocus, handleBlur } = useQuantity();
const { priceNow, priceBefore } = usePrice();

function useQuantity() {
  const localQuantity = ref(item.value.quantity);
  const isFocused = ref(false);

  watch(
    () => item.value.quantity,
    (newVal) => {
      if (!isFocused.value) {
        localQuantity.value = newVal;
      }
    }
  );

  const updateDebounced = useDebounceFn((quantity: number) => {
    changeQuantity(item.value.product_id, quantity);
  }, 300);

  const handleUpdate = (val: number) => {
    localQuantity.value = val;
    updateDebounced(val);
  };

  const handleFocus = () => {
    isFocused.value = true;
  };

  const handleBlur = () => {
    isFocused.value = false;

    if (localQuantity.value === item.value.quantity) return;

    localQuantity.value = item.value.quantity;
  };

  return {
    localQuantity,
    handleUpdate,
    handleFocus,
    handleBlur,
  };
}

function usePrice() {
  const priceNow = computed(() =>
    item.value.discount
      ? item.value.final_line_price.toFixed(2)
      : item.value.line_price.toFixed(2)
  );

  const priceBefore = computed(() =>
    item.value.discount ? item.value.line_price.toFixed(2) : null
  );

  return {
    priceNow,
    priceBefore,
  };
}
</script>

<template>
  <div
    class="py-4 border-b border-gray-100 last:border-0 md:grid md:grid-cols-12 md:gap-4 md:items-center flex flex-col gap-4 rounded-lg shadow-sm bg-white transition-opacity duration-200"
    :class="{
      'opacity-60 pointer-events-none': isItemPending(item.product_id),
    }"
  >
    <div class="md:col-span-6 flex gap-4">
      <div
        class="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0"
      >
        <img
          v-if="item.product.thumbnail"
          :src="item.product.thumbnail"
          :alt="item.product.title"
          class="w-full h-full object-cover"
        />
      </div>

      <div class="flex-1">
        <NuxtLink
          class="font-semibold text-lg hover:underline block mb-1"
          :to="`${ROUTES.CATALOG}/${item.product_id}`"
          prefetch-on="interaction"
          >{{ item.product.title }}</NuxtLink
        >
        <p class="text-gray-600">${{ priceNow }}</p>
        <p v-if="item.discount" class="text-gray-400 line-through">
          ${{ priceBefore }}
        </p>
      </div>
    </div>

    <div class="md:col-span-4 flex gap-1 justify-start md:justify-center">
      <UiQuantityInput
        :model-value="localQuantity"
        @update:model-value="handleUpdate"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <UiButton
        variant="ghost"
        size="small"
        class="border-0 p-2 h-auto text-red-500 hover:bg-transparent"
        aria-label="Remove item"
        @click="removeItem(item.product_id)"
      >
        <Icon name="ic:baseline-delete-forever" size="20" />
      </UiButton>
    </div>

    <div
      class="md:col-span-2 flex justify-between md:justify-end items-center gap-6"
    >
      <div class="font-bold text-lg">
        ${{ item.final_line_price.toFixed(2) }}
      </div>
    </div>
  </div>
</template>
