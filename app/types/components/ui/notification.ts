/**
 * Notification component props
 */
export interface NotificationProps {
  show: boolean;
  message: string;
  variant?: "success" | "error" | "info";
  icon?: string;
}

/**
 * Notification component emits
 */
export type NotificationEmits = {
  "update:show": [value: boolean];
  close: [];
};
