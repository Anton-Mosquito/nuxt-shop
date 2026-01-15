import type { SocialLink } from "~/types/ui/navigation";

/**
 * Social media links
 * Used in: DefaultFooter.vue
 */
export const SOCIAL_LINKS: readonly SocialLink[] = [
  { name: "LinkedIn", url: "https://linkedin.com", icon: "mdi:linkedin" },
  { name: "Instagram", url: "https://instagram.com", icon: "mdi:instagram" },
  { name: "Facebook", url: "https://facebook.com", icon: "mdi:facebook" },
  { name: "Twitter", url: "https://twitter.com", icon: "mdi:twitter" },
] as const;

/**
 * Share buttons for product pages
 * Includes platform identifier, icon, and accessible label
 */
export const SHARE_BUTTONS = [
  { platform: "email", icon: "mdi:email-outline", label: "Email" },
  { platform: "facebook", icon: "mdi:facebook", label: "Facebook" },
  { platform: "instagram", icon: "mdi:instagram", label: "Instagram" },
  { platform: "twitter", icon: "mdi:twitter", label: "Twitter" },
] as const;
