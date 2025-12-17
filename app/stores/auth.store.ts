import { defineStore } from "pinia";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const token = ref<string | undefined>();

    function setToken(newToken: string) {
      token.value = newToken;
    }

    function clearToken() {
      token.value = undefined;
    }

    return {
      token,
      setToken,
      clearToken,
    };
  },
  { persist: true }
);
