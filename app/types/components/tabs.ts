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


export type TabDirection = 1 | -1;

/**
 * Tabs component props
 */
export interface TabsProps {
  tabs: Tab[];
  modelValue?: TabId;
  defaultTab?: TabId;
  lazy?: boolean;
}