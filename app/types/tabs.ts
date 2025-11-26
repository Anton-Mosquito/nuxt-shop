export interface ITab {
  id: string;
  label: string;
  icon?: string;
  badge?: number | string;
  disabled?: boolean;
}

export type TabId = string;
