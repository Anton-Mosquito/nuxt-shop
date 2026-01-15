export const LIMIT = 6;
export const DEBOUNCE_DELAY = 500;
export const MIN_PRICE = 0;
export const MAX_PRICE = 2600;
export const DEFAULT_PAGE = 1;
export const APP_NAME = "Nuxt Shop";
export const DEFAULT_LOCALE = "uk";

export const ROUTES = {
  HOME: "/",
  CATALOG: "/catalog",
  ABOUT: "/about",
  CART: "/cart",
  FAVORITES: "/favorites",
  ACCOUNT: "/account",
  CONTACT: "/contact",
  TERMS: "/terms",
  DELIVERY_REFUND: "/delivery-refund",
  AUTH_RESET_PASSWORD: "/auth/reset-password",
  SEARCH: "/search",
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    RESTORE: "/auth/restore",
    LOGOUT: "/auth/logout",
  },
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[Exclude<keyof typeof ROUTES, "AUTH">];
export type RouteAuthPath = (typeof ROUTES.AUTH)[keyof typeof ROUTES.AUTH];

export const API_ENDPOINTS = {
  PRODUCTS: "/api/products",
  FAVORITES: "/api/favorites",
  AUTH: "/api/auth",
  ORDERS: "/api/orders",
  ORDERS_AUTH: "/api/orders/auth",
  CHECKOUT_SUCCESS: "/api/checkout/success",
  CATEGORIES: "/api/categories",
  CART: "/api/cart",
} as const;


export const COLORS = {
  PRIMARY: "#000000",
  SECONDARY: "#666666",
  ACCENT: "#000000",
  SUCCESS: "#10b981",
  ERROR: "#ef4444",
  WARNING: "#f59e0b",
  INFO: "#3b82f6",
} as const;

export const ICON_SIZES = {
  SM: "16",
  MD: "21",
  LG: "32",
  XL: "48",
} as const;

export type IconSize = (typeof ICON_SIZES)[keyof typeof ICON_SIZES];
