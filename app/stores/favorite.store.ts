//import { defineStore } from "pinia";
import type {
  ProductFavoriteInput,
  SyncFavoritesInput,
} from "~~/shared/schemas/favorites.schema";
import { API_ENDPOINTS } from "~/constants";

export const useFavoriteStore = defineStore(
  "favorite",
  () => {
    const { start, finish, clear } = useLoadingIndicator({
      throttle: 100,
    });
    const { loggedIn } = useUserSession();
    const favoriteIds = ref<number[]>([]);

    async function syncWithServer() {
      if (!loggedIn.value) return;

      try {
        start();
        const payload: SyncFavoritesInput = { ids: favoriteIds.value };
        const serverIds = await $fetch<number[]>(
          `${API_ENDPOINTS.FAVORITES}/sync`,
          {
            method: "POST",
            body: payload,
          }
        );
        favoriteIds.value = serverIds;
        finish();
      } catch (e) {
        console.error("Sync favorites error", e);
      } finally {
        clear();
      }
    }

    async function fetchFavorites() {
      if (!loggedIn.value) return;

      try {
        const serverIds = await $fetch<number[]>(`${API_ENDPOINTS.FAVORITES}`);
        favoriteIds.value = serverIds;
      } catch (e) {
        console.error("Fetch favorites error", e);
      }
    }

    async function addToFavorite(id: number) {
      if (!favoriteIds.value.includes(id)) {
        favoriteIds.value.push(id);
      }

      if (!loggedIn.value) return;

      try {
        const payload: ProductFavoriteInput = { productId: id };

        await $fetch(`${API_ENDPOINTS.FAVORITES}`, {
          method: "POST",
          body: payload,
        });
      } catch (e) {
        console.error("Add to favorite error", e);
      }
    }

    async function removeFromFavorite(id: number) {
      favoriteIds.value = favoriteIds.value.filter((favId) => favId !== id);

      if (!loggedIn.value) return;

      try {
        const payload: ProductFavoriteInput = { productId: id };
        await $fetch(`${API_ENDPOINTS.FAVORITES}`, {
          method: "DELETE",
          body: payload,
        });
      } catch (e) {
        console.error("Remove from favorite error", e);
      }
    }

    function toggleFavorite(id: number) {
      if (favoriteIds.value.includes(id)) {
        removeFromFavorite(id);
      } else {
        addToFavorite(id);
      }
    }

    function isFavorite(id: number) {
      return favoriteIds.value.includes(id);
    }

    if (import.meta.client) {
      watch(
        loggedIn,
        (isLoggedIn) => {
          if (!isLoggedIn) return;
          syncWithServer();
        },
        { immediate: true }
      );
    }

    return {
      favoriteIds,
      addToFavorite,
      removeFromFavorite,
      toggleFavorite,
      isFavorite,
      fetchFavorites,
      syncWithServer,
    };
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.cookies(),
      pick: ["favoriteIds"],
    },
  }
);
