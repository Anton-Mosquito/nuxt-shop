import { HEADER_ICON_NAVIGATION } from "~/constants";
import type { NavItem } from "~/types";

export function useNavigationBadges() {
  const { totalItems } = useCart();
  const { favoriteIds } = useWishlist();

  const iconNavigationWithBadges = computed((): NavItem[] => {
    return HEADER_ICON_NAVIGATION.map((item) => {
      if (item.label === "Cart") {
        return {
          ...item,
          badge: totalItems.value > 0 ? totalItems.value : undefined,
        };
      }

      if (item.label === "Favorites") {
        const favCount = favoriteIds.value.length || 0;
        return {
          ...item,
          badge: favCount > 0 ? favCount : undefined,
        };
      }

      return item;
    });
  });

  function getBadgeCount(itemLabel: string): number | undefined {
    const item = iconNavigationWithBadges.value.find(
      (nav) => nav.label === itemLabel
    );
    return typeof item?.badge === "number" ? item.badge : undefined;
  }

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
