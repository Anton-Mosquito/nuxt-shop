import type { RoutePath } from "~/constants/common";

export interface NavLink {
  name: string;
  path: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface NavItem {
  label: string;
  to: RoutePath;
  icon?: string;
  ariaLabel?: string;
  badge?: string | number;
  children?: NavItem[];
  requiresAuth?: boolean; // For account dropdown
}

export interface NavigationStateProps {
  openDropdowns: ReadonlySet<string>;
}

export interface IconNavigationProps {
  iconNavigation: NavItem[];
}

export interface MenuStateProps {
  isOpen: boolean;
}

export interface NavigationToggleEmit {
  "toggle-dropdown": [itemLabel: string];
}

export interface AuthActionEmit {
  logout: [];
}

export interface CloseActionEmit {
  close: [];
}

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
