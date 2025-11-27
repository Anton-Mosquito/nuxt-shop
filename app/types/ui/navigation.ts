/**
 * Navigation link interface
 */
export interface NavLink {
  name: string;
  path: string;
}

/**
 * Icon link interface for header actions
 */
export interface IconLink {
  path: string;
  icon: string;
  label?: string;
}

/**
 * Social media link interface
 */
export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}
