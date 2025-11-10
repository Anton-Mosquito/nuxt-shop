import { defineStore } from "pinia";

export const useFavoriteStore = defineStore("favorite", () => {
  const favoriteIds = ref<number[]>([]);

  function addToFavorite(id: number) {
    if (!favoriteIds.value.includes(id)) {
      favoriteIds.value.push(id);
    }
  }

  function removeFromFavorite(id: number) {
    favoriteIds.value = favoriteIds.value.filter((favId) => favId !== id);
  }

  return {
    favoriteIds,
    addToFavorite,
    removeFromFavorite,
  };
});
