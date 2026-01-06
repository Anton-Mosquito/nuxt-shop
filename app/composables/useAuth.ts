export const useAuth = () => {
  const {
    loggedIn,
    user,
    fetch: refreshSession,
    clear: clearSession,
  } = useUserSession();
  const { success, error } = useToast();

  const login = async (email: string, password: string) => {
    try {
      await $fetch("/api/login", { method: "POST", body: { email, password } });
      await refreshSession();
      await navigateTo("/dashboard");
      success({ message: "Login successful!" });
    } catch (e) {
      console.error("Login error:", e);
      error({ message: "Bad credentials" });
    }
  };

  const register = async (email: string, password: string) => {
    try {
      await $fetch("/api/register", {
        method: "POST",
        body: { email, password },
      });
      await refreshSession();
      await navigateTo("/auth/login");
      success({ message: "Registration successful!" });
    } catch (e) {
      console.error("Login error:", e);
      error({ message: JSON.stringify(e) });
    }
  };

  const logout = async () => {
    try {
      await $fetch("/api/logout", { method: "POST" });
      await clearSession();
      await navigateTo("/auth/login");
      success({ message: "Logout successful!" });
    } catch (e) {
      console.error("Login error:", e);
      error({ message: "Logout failed" });
    }
  };

  return { user, refreshSession, login, register, logout, loggedIn };
};
