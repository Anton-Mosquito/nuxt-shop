// App constants
export const APP_NAME = "Nuxt Shop";
export const DEFAULT_LOCALE = "uk";

// Routes
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

// API endpoints
export const API_ENDPOINTS = {
  PRODUCTS: "/api/products",
  FAVORITES: "/api/favorites",
  AUTH: "/api/auth",
} as const;

// Validation
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_NAME_LENGTH: 50,
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

// UI constants
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1280,
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  PAGE_SIZE_OPTIONS: [12, 24, 48],
} as const;
