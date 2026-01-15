export function updateCartOptimistically(
  cart: CartResponse | null,
  productId: number,
  quantity: number
): CartResponse | null {
  if (!cart?.items) return cart;

  const updatedItems =
    quantity <= 0
      ? cart.items.filter((i) => i.product_id !== productId)
      : cart.items.map((i) =>
          i.product_id === productId ? { ...i, quantity } : i
        );

  return {
    ...cart,
    items: updatedItems,
    item_count: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
  };
}
