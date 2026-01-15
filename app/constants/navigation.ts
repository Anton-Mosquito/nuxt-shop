import type { NavLink, NavItem, SocialLink } from "~/types";
import { ROUTES } from "./common";

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { name: "LinkedIn", url: "https://linkedin.com", icon: "mdi:linkedin" },
  { name: "Instagram", url: "https://instagram.com", icon: "mdi:instagram" },
  { name: "Facebook", url: "https://facebook.com", icon: "mdi:facebook" },
  { name: "Twitter", url: "https://twitter.com", icon: "mdi:twitter" },
] as const;

export const SHARE_BUTTONS = [
  { platform: "email", icon: "mdi:email-outline", label: "Email" },
  { platform: "facebook", icon: "mdi:facebook", label: "Facebook" },
  { platform: "instagram", icon: "mdi:instagram", label: "Instagram" },
  { platform: "twitter", icon: "mdi:twitter", label: "Twitter" },
] as const;

export const FOOTER_NAV_LINKS: readonly NavLink[] = [
  { name: "Contacts", path: ROUTES.CONTACT },
  { name: "Terms and Conditions", path: ROUTES.TERMS },
  { name: "Delivery and Refund Policy", path: ROUTES.DELIVERY_REFUND },
] as const;

export const FOOTER_INFO_LINKS: readonly NavLink[] = [
  { name: "About Us", path: ROUTES.ABOUT },
  { name: "Delivery", path: ROUTES.DELIVERY_REFUND },
  { name: "Returns", path: "/returns" },
] as const;

export const HEADER_NAVIGATION: readonly NavItem[] = [
  {
    label: "Shop",
    to: ROUTES.CATALOG,
    icon: "ic:outline-shopping-bag",
    ariaLabel: "View product catalog",
    children: [
      {
        label: "All Products",
        to: ROUTES.CATALOG,
        icon: "ic:baseline-grid-view",
        ariaLabel: "View all products",
      },
      {
        label: "New Arrivals",
        to: `${ROUTES.CATALOG}?sort=newest`,
        icon: "ic:baseline-new-releases",
        ariaLabel: "View new arrivals",
      },
      {
        label: "Sale",
        to: `${ROUTES.CATALOG}?filter=sale`,
        icon: "ic:baseline-local-offer",
        ariaLabel: "View sale items",
      },
    ],
  },
  {
    label: "About Us",
    to: ROUTES.ABOUT,
    icon: "ic:outline-info",
    ariaLabel: "Learn more about us",
  },
] as const;

export const HEADER_ICON_NAVIGATION: readonly NavItem[] = [
  {
    label: "Search",
    to: ROUTES.SEARCH,
    icon: "ic:baseline-search",
    ariaLabel: "Search products",
  },
  {
    label: "Cart",
    to: ROUTES.CART,
    icon: "ic:outline-shopping-cart",
    ariaLabel: "View shopping cart",
    badge: 0,
  },
  {
    label: "Favorites",
    to: ROUTES.FAVORITES,
    icon: "ic:baseline-favorite-border",
    ariaLabel: "View favorites",
  },
  {
    label: "Account",
    to: ROUTES.ACCOUNT,
    icon: "ic:outline-account-circle",
    ariaLabel: "Account settings",
    requiresAuth: true,
    children: [
      {
        label: "Profile",
        to: ROUTES.ACCOUNT,
        icon: "ic:outline-person",
        ariaLabel: "View profile",
      },
      {
        label: "Orders",
        to: `${ROUTES.ACCOUNT}/orders`,
        icon: "ic:outline-receipt-long",
        ariaLabel: "View orders",
      },
      {
        label: "Settings",
        to: `${ROUTES.ACCOUNT}/settings`,
        icon: "ic:outline-settings",
        ariaLabel: "Account settings",
      },
      {
        label: "Logout",
        to: ROUTES.AUTH.LOGOUT,
        icon: "ic:outline-logout",
        ariaLabel: "Logout",
      },
    ],
  },
] as const;

export const PRODUCT_TABS = [
  {
    id: "description",
    label: "Description",
    icon: "ic:baseline-description",
  },
  {
    id: "reviews",
    label: "Reviews",
    icon: "ic:baseline-star-border",
  },
  {
    id: "specifications",
    label: "Specifications",
    icon: "ic:baseline-format-list-bulleted",
    disabled: true,
  },
] as const;

export const BREADCRUMB_LABELS: Record<string, string> = {
  "": "Home",
  dashboard: "Dashboard",
  users: "Users",
  products: "Products",
  orders: "Orders",
  analytics: "Analytics",
  settings: "Settings",
  new: "New",
  edit: "Edit",
  categories: "Categories",
  inventory: "Inventory",
  general: "General",
  security: "Security",
  notifications: "Notifications",
  integrations: "Integrations",
  account: "Account",
  auth: "Authorization",
  login: "Login",
  register: "Register",
  cart: "Cart",
  favorites: "Favorites",
  catalog: "Catalog",
};
