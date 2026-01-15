/**
 * Navigation link interface
 */
export interface NavLink {
  name: string;
  path: string;
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

/**
 * Props for components that need access to open dropdowns state
 */
export interface NavigationStateProps {
  openDropdowns: ReadonlySet<string>;
}

/**
 * Props for components that display icon navigation items
 */
export interface IconNavigationProps {
  iconNavigation: NavItem[];
}

/**
 * Props for components that have an open/closed state
 */
export interface MenuStateProps {
  isOpen: boolean;
}

/**
 * Emits for toggling dropdowns
 */
export interface NavigationToggleEmit {
  "toggle-dropdown": [itemLabel: string];
}

/**
 * Emits for authentication actions
 */
export interface AuthActionEmit {
  logout: [];
}

/**
 * Emits for closing actions
 */
export interface CloseActionEmit {
  close: [];
}

/**
 * Emits for toggle actions
 */
export interface ToggleActionEmit {
  toggle: [];
}

/**
 * Combined props for desktop navigation components
 */
export type DesktopNavigationProps = NavigationStateProps & IconNavigationProps;

/**
 * Combined props for mobile navigation components
 */
export type MobileNavigationProps = MenuStateProps &
  NavigationStateProps &
  IconNavigationProps;

/**
 * Combined emits for navigation actions (toggle dropdown, logout)
 */
export type NavigationActionEmits = NavigationToggleEmit & AuthActionEmit;

/**
 * Combined emits for mobile navigation actions (close, toggle dropdown, logout)
 */
export type MobileNavigationActionEmits = CloseActionEmit &
  NavigationToggleEmit &
  AuthActionEmit;
