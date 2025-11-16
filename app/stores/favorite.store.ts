import { defineStore } from "pinia";

export const useFavoriteStore = defineStore(
  "favorite",
  () => {
    const authStore = useAuthStore();
    const favoriteIds = ref<number[]>([]);

    function addToFavorite(id: number) {
      if (!favoriteIds.value.includes(id)) {
        favoriteIds.value.push(id);
      }
    }

    function removeFromFavorite(id: number) {
      favoriteIds.value = favoriteIds.value.filter((favId) => favId !== id);
    }

    function toggleFavorite(id: number) {
      if (favoriteIds.value.includes(id)) {
        removeFromFavorite(id);
      } else {
        addToFavorite(id);

        if (!authStore.email) return;
        
        save();
      }
    }

    function isFavorite(id: number) {
      return favoriteIds.value.includes(id);
    }

    async function save() {
      const data = await $fetch<{ success: boolean }>("/api/favorites", {
        method: "POST",
        body: {
          email: authStore.email,
          ids: favoriteIds.value,
        },
      });
      console.log("🚀 ~ save ~ data:", data);
    }

    async function restore(email: string) {
      const data = await $fetch<number[]>("/api/favorites", {
        method: "GET",
        query: {
          email,
        },
      });
      console.log("🚀 ~ restore ~ data:", data);
      favoriteIds.value = data || [];
    }

    // async function fetchFavorites() {
    //   const baseURL = import.meta.server
    //     ? "http://127.0.0.1:3000/api/"
    //     : "http://localhost:3000/api/";
    //   const data = await $fetch<IGetCategoriesResponse>(`categories`, {
    //     baseURL,
    //   });
    //   console.log("🚀 ~ fetchFavorites ~ data:", data);
    //   favoriteIds.value = data.categories.map((category) => category.id);
    // }

    return {
      favoriteIds,
      addToFavorite,
      removeFromFavorite,
      toggleFavorite,
      isFavorite,
      restore,
      //fetchFavorites,
    };
  },
  {
    persist: true,
  }
);
