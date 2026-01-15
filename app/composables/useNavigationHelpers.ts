import type { NavItem } from "~/types";

export function useNavigationHelpers(openDropdowns: ReadonlySet<string>) {
  const route = useRoute();

  const isDropdownOpen = (label: string) => openDropdowns.has(label);

  const isParentActive = (item: NavItem) => {
    if (!item.children) return false;
    return item.children.some((child) => route.path === child.to);
  };

  return {
    isDropdownOpen,
    isParentActive,
  };
}
