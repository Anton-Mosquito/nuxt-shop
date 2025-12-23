import type { NavItem } from "~/types/ui/navigation";

/**
 * Enhanced navigation configuration for DefaultHeader1
 * Includes main menu items with dropdown support
 */
export const HEADER_NAVIGATION: readonly NavItem[] = [
  {
    label: "Shop",
    to: "/catalog",
    icon: "ic:outline-shopping-bag",
    ariaLabel: "View product catalog",
    children: [
      {
        label: "All Products",
        to: "/catalog",
        icon: "ic:baseline-grid-view",
        ariaLabel: "View all products",
      },
      {
        label: "New Arrivals",
        to: "/catalog?sort=newest",
        icon: "ic:baseline-new-releases",
        ariaLabel: "View new arrivals",
      },
      {
        label: "Sale",
        to: "/catalog?filter=sale",
        icon: "ic:baseline-local-offer",
        ariaLabel: "View sale items",
      },
    ],
  },
  {
    label: "About Us",
    to: "/about",
    icon: "ic:outline-info",
    ariaLabel: "Learn more about us",
  },
] as const;

/**
 * Header icon navigation items (right side)
 * Includes actions like search, cart, favorites, and account
 */
export const HEADER_ICON_NAVIGATION: readonly NavItem[] = [
  {
    label: "Search",
    to: "/search",
    icon: "ic:baseline-search",
    ariaLabel: "Search products",
  },
  {
    label: "Cart",
    to: "/cart",
    icon: "ic:outline-shopping-cart",
    ariaLabel: "View shopping cart",
    badge: 0, // Will be updated dynamically
  },
  {
    label: "Favorites",
    to: "/favorites",
    icon: "ic:baseline-favorite-border",
    ariaLabel: "View favorites",
  },
  {
    label: "Account",
    to: "/account",
    icon: "ic:outline-account-circle",
    ariaLabel: "Account settings",
    requiresAuth: true,
    children: [
      {
        label: "Profile",
        to: "/account",
        icon: "ic:outline-person",
        ariaLabel: "View profile",
      },
      {
        label: "Orders",
        to: "/account/orders",
        icon: "ic:outline-receipt-long",
        ariaLabel: "View orders",
      },
      {
        label: "Settings",
        to: "/account/settings",
        icon: "ic:outline-settings",
        ariaLabel: "Account settings",
      },
      {
        label: "Logout",
        to: "/auth/logout",
        icon: "ic:outline-logout",
        ariaLabel: "Logout",
      },
    ],
  },
] as const;
