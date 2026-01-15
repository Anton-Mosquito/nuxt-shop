/**
 * Accessibility / ARIA related constants
 * Central place for aria-labels and other accessibility strings
 */
export const MOBILE_MENU_ARIA = {
  OPEN: "Open navigation menu",
  CLOSE: "Close navigation menu",
} as const;

// Future accessibility constants can be added here, e.g.:
// export const ARIA_LIVE = { POLITE: 'polite', ASSERTIVE: 'assertive' } as const;

export type MobileMenuAria = typeof MOBILE_MENU_ARIA;
