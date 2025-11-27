import type { NavLink, IconLink } from "~/types/ui/navigation";

/**
 * Main navigation links for header menu
 * Used in: DefaultHeader.vue
 */
export const NAV_LINKS: readonly NavLink[] = [
  { name: "Shop", path: "/catalog" },
  { name: "About Us", path: "/about" },
] as const;

/**
 * Header action icon links
 * Used in: DefaultHeader.vue
 */
export const HEADER_ICON_LINKS: readonly IconLink[] = [
  { path: "/search", icon: "ic:baseline-search", label: "Search" },
  { path: "/cart", icon: "ic:outline-shopping-cart", label: "Cart" },
  {
    path: "/favorites",
    icon: "ic:baseline-favorite-border",
    label: "Favorites",
  },
  { path: "/account", icon: "ic:outline-account-circle", label: "Account" },
] as const;

/**
 * Footer navigation links
 * Used in: DefaultFooter.vue
 */
export const FOOTER_NAV_LINKS: readonly NavLink[] = [
  { name: "Contacts", path: "/contacts" },
  { name: "Terms and Conditions", path: "/terms" },
  { name: "Delivery and Refund Policy", path: "/delivery-refund" },
] as const;

/**
 * Footer informational links
 * Used in: DefaultFooter.vue
 */
export const FOOTER_INFO_LINKS: readonly NavLink[] = [
  { name: "About Us", path: "/about" },
  { name: "Delivery", path: "/delivery" },
  { name: "Returns", path: "/returns" },
] as const;
