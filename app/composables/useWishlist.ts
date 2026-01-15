export function useWishlist() {
  const store = useFavoriteStore();
  const { favoriteIds } = storeToRefs(store);

  return {
    favoriteIds,
    toggleFavorite: store.toggleFavorite,
    isFavorite: store.isFavorite,
    fetchFavorites: store.fetchFavorites,
  };
}
