import type { NavLink } from "~/types/ui/navigation";

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
