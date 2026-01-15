export function useNavigation() {
  const router = useRouter();
  const authStore = useAuthStore();

  // Navigation state
  const mobileMenuOpen = ref(false);
  const openDropdowns = ref<Set<string>>(new Set());

  /**
   * Toggle dropdown state for a navigation item
   */
  function toggleDropdown(itemLabel: string) {
    if (openDropdowns.value.has(itemLabel)) {
      openDropdowns.value.delete(itemLabel);
    } else {
      openDropdowns.value.add(itemLabel);
    }
  }

  /**
   * Close all dropdowns
   */
  function closeAllDropdowns() {
    openDropdowns.value.clear();
  }

  /**
   * Close mobile menu and all dropdowns
   */
  function closeMobileMenu() {
    mobileMenuOpen.value = false;
    closeAllDropdowns();
  }

  /**
   * Toggle mobile menu state
   */
  function toggleMobileMenu() {
    mobileMenuOpen.value = !mobileMenuOpen.value;
    if (mobileMenuOpen.value) return;

    closeAllDropdowns();
  }

  /**
   * Handle logout action
   * Clears auth token and redirects to home
   */
  function handleLogout(event?: Event) {
    event?.preventDefault();
    authStore.clearToken();
    router.push("/");
    closeMobileMenu();
  }

  return {
    // State
    mobileMenuOpen: readonly(mobileMenuOpen),
    openDropdowns: readonly(openDropdowns),

    // Actions
    toggleDropdown,
    closeAllDropdowns,
    closeMobileMenu,
    toggleMobileMenu,
    handleLogout,
  };
}
