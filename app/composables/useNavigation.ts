export function useNavigation() {
  const { logout } = useAuth();

  const mobileMenuOpen = ref(false);
  const openDropdowns = ref<Set<string>>(new Set());

  function toggleDropdown(itemLabel: string) {
    if (openDropdowns.value.has(itemLabel)) {
      openDropdowns.value.delete(itemLabel);
    } else {
      openDropdowns.value.add(itemLabel);
    }
  }

  function closeAllDropdowns() {
    openDropdowns.value.clear();
  }

  function closeMobileMenu() {
    mobileMenuOpen.value = false;
    closeAllDropdowns();
  }

  function toggleMobileMenu() {
    mobileMenuOpen.value = !mobileMenuOpen.value;
    if (mobileMenuOpen.value) return;

    closeAllDropdowns();
  }

  function handleLogout(event?: Event) {
    event?.preventDefault();
    closeMobileMenu();
    logout();
  }

  return {
    mobileMenuOpen: readonly(mobileMenuOpen),
    openDropdowns: readonly(openDropdowns),

    toggleDropdown,
    closeAllDropdowns,
    closeMobileMenu,
    toggleMobileMenu,
    handleLogout,
  };
}
