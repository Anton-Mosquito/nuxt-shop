export const MOBILE_MENU_ARIA = {
  OPEN: "Open navigation menu",
  CLOSE: "Close navigation menu",
} as const;

export type MobileMenuAria = typeof MOBILE_MENU_ARIA;

export const FOOTER_STRINGS = {
  BUTTON_SUBSCRIBE_ARIA: "subscribe",
  COPYRIGHT_OWNER: "My Company",
} as const;

export type FooterStringKey = keyof typeof FOOTER_STRINGS;
export type FooterString = (typeof FOOTER_STRINGS)[FooterStringKey];
