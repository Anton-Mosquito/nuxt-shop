/**
 * Footer-related UI strings and messages.
 * Exported as constants to centralize copy and allow easy localisation.
 */
export const FOOTER_STRINGS = {
  BUTTON_SUBSCRIBE_ARIA: "subscribe",
  COPYRIGHT_OWNER: "My Company",
} as const;

export type FooterStringKey = keyof typeof FOOTER_STRINGS;
export type FooterString = (typeof FOOTER_STRINGS)[FooterStringKey];
