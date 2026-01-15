import type { NavItem } from "~/types/ui/navigation";

/**
 * Setup click outside handlers for dropdowns
 * Automatically closes dropdown when clicking outside its container
 *
 * @param items - List of navigation items (can be ref, computed, or array)
 * @param dropdownRefs - Ref to a map of HTML elements
 * @param isDropdownOpen - Function to check if a dropdown is open
 * @param onClose - Callback to close a dropdown
 */
export function useDropdownClickOutside(
  items: readonly NavItem[] | NavItem[],
  dropdownRefs: Ref<Record<string, HTMLElement | null>>,
  isDropdownOpen: (label: string) => boolean,
  onClose: (label: string) => void
) {
  watchEffect(() => {
    const disposers: Array<() => void> = [];

    items.forEach((item) => {
      const target = dropdownRefs.value[item.label];
      if (!item.children || !target) return;

      const stop = onClickOutside(target, () => {
        if (!isDropdownOpen(item.label)) return;
        if (target.offsetParent === null) return;

        onClose(item.label);
      });

      disposers.push(stop);
    });

    onWatcherCleanup(() => {
      disposers.forEach((stop) => stop());
    });
  });
}
