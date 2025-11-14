import { defineStore } from "pinia";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const token = ref<string | undefined>();
    const email = ref<string | undefined>();

    function setToken(newToken: string) {
      token.value = newToken;
    }

    function setEmail(newEmail: string) {
      email.value = newEmail;
    }

    function clearToken() {
      token.value = undefined;
    }

    return {
      token,
      email,
      setToken,
      setEmail,
      clearToken,
    };
  },
  { persist: true }
);
