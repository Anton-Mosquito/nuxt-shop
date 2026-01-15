import type { CartItemInput } from "~~/shared/schemas/cart.schema";
import { API_ENDPOINTS, ERROR_MESSAGES } from "~/constants";

export const useCartStore = defineStore(
  "cart",
  () => {
    const { start, finish, clear } = useLoadingIndicator({
      throttle: 100,
    });
    const { error } = useToast();
    const cart = ref<CartResponse | null>(null);
    const loading = ref(false);
    const pendingItems = ref(new Set<number>());

    const itemCount = computed(() => cart.value?.item_count ?? 0);
    const totalPrice = computed(() => cart.value?.total_price ?? 0);
    const finalPrice = computed(() => cart.value?.final_price ?? 0);
    const totalDiscount = computed(
      () => (cart.value?.total_price ?? 0) - (cart.value?.final_price ?? 0)
    );
    const items = computed<CartItem[]>(() => cart.value?.items ?? []);
    const headers = useRequestHeaders(["cookie"]);

    async function fetchCart() {
      loading.value = true;
      start();
      try {
        cart.value = await $fetch<CartResponse>(`${API_ENDPOINTS.CART}`, {
          headers,
        });
      } catch (e) {
        console.error("Fetch cart error", e);
        clear();
        error({ message: ERROR_MESSAGES.FAILED_TO_FETCH_CART });
      } finally {
        finish();
        loading.value = false;
      }
    }

    async function addItem(productId: number, quantity: number = 1) {
      loading.value = true;
      try {
        const payload: CartItemInput = { productId, quantity };
        cart.value = await $fetch<CartResponse>(`${API_ENDPOINTS.CART}/add`, {
          method: "POST",
          body: payload,
        });
      } catch (e) {
        console.error("Add item error", e);
        error({ message: ERROR_MESSAGES.FAILED_TO_ADD_ITEM });
      } finally {
        loading.value = false;
      }
    }

    async function changeQuantity(productId: number, quantity: number) {
      const prevCart = structuredClone(toRaw(cart.value));
      pendingItems.value.add(productId);

      cart.value = updateCartOptimistically(cart.value, productId, quantity);

      try {
        const payload: CartItemInput = { productId, quantity };
        const updated = await $fetch<CartResponse>(
          `${API_ENDPOINTS.CART}/change`,
          {
            method: "POST",
            body: payload,
          }
        );
        cart.value = updated;
      } catch (e) {
        console.error("Failed to change quantity:", e);
        error({ message: ERROR_MESSAGES.FAILED_TO_CHANGE_QUANTITY });
        cart.value = prevCart; // rollback
      } finally {
        pendingItems.value.delete(productId);
      }
    }

    async function removeItem(productId: number) {
      return changeQuantity(productId, 0);
    }

    async function clearCart() {
      loading.value = true;
      try {
        cart.value = await $fetch<CartResponse>(`${API_ENDPOINTS.CART}/clear`, {
          method: "POST",
        });
      } catch (e) {
        console.error("Clear cart error", e);
      } finally {
        loading.value = false;
      }
    }

    const isItemPending = (productId: number) =>
      pendingItems.value.has(productId);

    return {
      cart,
      loading,
      items,
      itemCount,
      totalPrice,
      finalPrice,
      totalDiscount,

      addItem,
      changeQuantity,
      removeItem,
      clearCart,
      fetchCart,
      isItemPending,
    };
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.cookies(),
      pick: ["cart"],
    },
  }
);
