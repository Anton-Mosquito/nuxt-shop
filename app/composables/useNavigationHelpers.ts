import type { NavItem } from "~/types/ui/navigation";

/**
 * Shared navigation helper functions
 * Used across desktop and mobile navigation components
 */
export function useNavigationHelpers(openDropdowns: Ref<ReadonlySet<string>>) {
  const route = useRoute();
  const authStore = useAuthStore();

  // Check if user is authenticated
  const isAuthenticated = computed(() => !!authStore.token);

  // Check if dropdown is open
  const isDropdownOpen = (label: string) => openDropdowns.value.has(label);

  // Check if any child route is active
  const isParentActive = (item: NavItem) => {
    if (!item.children) return false;
    return item.children.some((child) => route.path === child.to);
  };

  return {
    isAuthenticated,
    isDropdownOpen,
    isParentActive,
  };
}
