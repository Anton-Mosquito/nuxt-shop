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

/**
 * Enhanced navigation item with dropdown support
 */
export interface NavItem {
  label: string;
  to: string;
  icon?: string;
  ariaLabel?: string;
  badge?: string | number;
  children?: NavItem[];
  requiresAuth?: boolean; // For account dropdown
}
