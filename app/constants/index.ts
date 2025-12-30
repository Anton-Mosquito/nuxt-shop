/**
 * Application name
 */
export const APP_NAME = "Nuxt Shop";

/**
 * Default locale for i18n
 */
export const DEFAULT_LOCALE = "uk";

/**
 * Application routes
 * Centralized route definitions for type-safe navigation
 */
export const ROUTES = {
  HOME: "/",
  CATALOG: "/catalog",
  ABOUT: "/about",
  CART: "/cart",
  FAVORITES: "/favorites",
  ACCOUNT: "/account",
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    RESTORE: "/auth/restore",
  },
} as const;

/**
 * API endpoint paths
 * Used for consistent API URL construction
 */
export const API_ENDPOINTS = {
  PRODUCTS: "/api/products",
  FAVORITES: "/api/favorites",
  AUTH: "/api/auth",
} as const;

/**
 * Form validation rules and patterns
 * Used in form validation logic
 */
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_NAME_LENGTH: 50,
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

/**
 * Responsive breakpoints (in pixels)
 * Should match Tailwind CSS breakpoints
 */
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1280,
} as const;

/**
 * Pagination configuration
 * Default settings for paginated lists
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  PAGE_SIZE_OPTIONS: [12, 24, 48],
} as const;

// Re-export grouped constant modules for convenience
export * from "./navigation";
export * from "./social";
export * from "./catalog";
export * from "./ui";
export * from "./header-navigation";
