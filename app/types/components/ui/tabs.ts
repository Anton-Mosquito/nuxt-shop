/**
 * Tab definition
 */
export interface Tab {
  id: string;
  label: string;
  icon?: string;
  badge?: number | string;
  disabled?: boolean;
}

/**
 * Tab ID type
 */
export type TabId = string;

/**
 * Tabs component props
 */
export interface TabsProps {
  tabs: Tab[];
  modelValue?: TabId;
  defaultTab?: TabId;
  lazy?: boolean;
}

/**
 * Tabs component emits
 */
export interface TabsEmits {
  "update:modelValue": [value: TabId];
  change: [value: TabId];
  "tab-mounted": [value: TabId];
}
