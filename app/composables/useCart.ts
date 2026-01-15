export function useCart() {
  const store = useCartStore();
  const {
    cart,
    items,
    itemCount,
    loading,
    totalPrice,
    finalPrice,
    totalDiscount,
  } = storeToRefs(store);

  return {
    cart,
    loading,
    items,
    totalItems: itemCount,
    totalPrice,
    finalPrice,
    totalDiscount,
    addItem: store.addItem,
    changeQuantity: store.changeQuantity,
    removeItem: store.removeItem,
    clear: store.clearCart,
    fetchCart: store.fetchCart,
    isItemPending: store.isItemPending,
  };
}
