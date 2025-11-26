// Navigation types
export interface NavLink {
  name: string;
  path: string;
}

export interface IconLink {
  path: string;
  icon: string;
  label?: string;
}

// Navigation links
export const NAV_LINKS: readonly NavLink[] = [
  { name: "Shop", path: "/catalog" },
  { name: "About Us", path: "/about" },
] as const;

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

// Footer links
export const FOOTER_NAV_LINKS: readonly NavLink[] = [
  { name: "Contacts", path: "/contacts" },
  { name: "Terms and Conditions", path: "/terms" },
  { name: "Delivery and Refund Policy", path: "/delivery-refund" },
] as const;

export const FOOTER_INFO_LINKS: readonly NavLink[] = [
  { name: "About Us", path: "/about" },
  { name: "Delivery", path: "/delivery" },
  { name: "Returns", path: "/returns" },
] as const;
export type NavLinkType = (typeof NAV_LINKS)[number];
export type IconLinkType = (typeof HEADER_ICON_LINKS)[number];
