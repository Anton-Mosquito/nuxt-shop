export interface Toast {
  id: string;
  type: "success" | "error" | "warning" | "info";
  message: string;
  duration?: number;
  timerId?: ReturnType<typeof setTimeout>;
}

export type ToastPayload = Omit<Toast, "id">;

/**
 * Toast options for creating new toasts
 */
export interface ToastOptions {
  message: string;
  duration?: number;
}
