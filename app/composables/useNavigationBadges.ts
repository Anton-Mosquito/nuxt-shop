import { HEADER_ICON_NAVIGATION } from "~/constants";
import type { NavItem } from "~/types/ui/navigation";

/**
 * Composable for managing navigation badges (Cart, Favorites counts)
 * Dynamically updates badge values based on store state
 */
export function useNavigationBadges() {
  const favoriteStore = useFavoriteStore();
  // TODO: Import cart store when available
  // const cartStore = useCartStore();

  /**
   * Computed navigation items with dynamic badge counts
   * Updates automatically when store state changes
   */
  const iconNavigationWithBadges = computed((): NavItem[] => {
    return HEADER_ICON_NAVIGATION.map((item) => {
      // Cart badge - TODO: Replace with actual cart count from store
      if (item.label === "Cart") {
        const cartCount = 0; // cartStore.items?.length || 0;
        return {
          ...item,
          badge: cartCount > 0 ? cartCount : undefined,
        };
      }

      // Favorites badge
      if (item.label === "Favorites") {
        const favCount = favoriteStore.favoriteIds?.length || 0;
        return {
          ...item,
          badge: favCount > 0 ? favCount : undefined,
        };
      }

      return item;
    });
  });

  /**
   * Get badge count for a specific navigation item
   */
  function getBadgeCount(itemLabel: string): number | undefined {
    const item = iconNavigationWithBadges.value.find(
      (nav) => nav.label === itemLabel
    );
    return typeof item?.badge === "number" ? item.badge : undefined;
  }

  /**
   * Check if item has a badge
   */
  function hasBadge(itemLabel: string): boolean {
    const count = getBadgeCount(itemLabel);
    return count !== undefined && count > 0;
  }

  return {
    iconNavigationWithBadges,
    getBadgeCount,
    hasBadge,
  };
}
