// Social & sharing constants
export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { name: "LinkedIn", url: "https://linkedin.com", icon: "mdi:linkedin" },
  { name: "Instagram", url: "https://instagram.com", icon: "mdi:instagram" },
  { name: "Facebook", url: "https://facebook.com", icon: "mdi:facebook" },
  { name: "Twitter", url: "https://twitter.com", icon: "mdi:twitter" },
] as const;

export type SocialLinkType = (typeof SOCIAL_LINKS)[number];

// Share buttons used on product pages (icon + platform identifier + accessible label)
export const SHARE_BUTTONS = [
  { platform: "email", icon: "mdi:email-outline", label: "Email" },
  { platform: "facebook", icon: "mdi:facebook", label: "Facebook" },
  { platform: "instagram", icon: "mdi:instagram", label: "Instagram" },
  { platform: "twitter", icon: "mdi:twitter", label: "Twitter" },
] as const;

export type ShareButtonType = (typeof SHARE_BUTTONS)[number];
