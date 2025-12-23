import type { NavItem } from "~/types/ui/navigation";

/**
 * Composable for centralized navigation state management
 * Manages mobile menu state, dropdown states, and navigation logic
 */
export function useNavigation() {
  const route = useRoute();
  const router = useRouter();
  const authStore = useAuthStore();

  // Navigation state
  const mobileMenuOpen = ref(false);
  const openDropdowns = ref<Set<string>>(new Set());

  /**
   * Determines if any child of a navigation item is active.
   * Supports both direct path matching and query parameter matching.
   */
  function isParentActive(item: NavItem): boolean {
    if (!item.children) return false;

    return item.children.some(({ to }) => {
      const [path, queryString] = to.split("?");

      if (route.path !== path) return false;
      if (!queryString) return true;

      const queryParams = new URLSearchParams(queryString);

      return Array.from(queryParams.entries()).every(
        ([key, value]) => route.query[key] === value
      );
    });
  }

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
   * Check if dropdown is open for a specific item
   */
  function isDropdownOpen(itemLabel: string): boolean {
    return openDropdowns.value.has(itemLabel);
  }

  /**
   * Close specific dropdown
   */
  function closeDropdown(itemLabel: string) {
    openDropdowns.value.delete(itemLabel);
  }

  /**
   * Close all dropdowns
   */
  function closeAllDropdowns() {
    openDropdowns.value.clear();
  }

  /**
   * Handle keyboard navigation for dropdowns
   * Supports Enter, Space, and Escape keys
   */
  function handleDropdownKeydown(event: KeyboardEvent, itemLabel: string) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleDropdown(itemLabel);
    } else if (event.key === "Escape") {
      closeDropdown(itemLabel);
    }
  }

  /**
   * Open mobile menu
   */
  function openMobileMenu() {
    mobileMenuOpen.value = true;
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

    // Computed
    isParentActive,
    isDropdownOpen,

    // Actions
    toggleDropdown,
    closeDropdown,
    closeAllDropdowns,
    handleDropdownKeydown,
    openMobileMenu,
    closeMobileMenu,
    toggleMobileMenu,
    handleLogout,
  };
}
