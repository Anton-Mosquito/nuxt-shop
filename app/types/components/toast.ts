import type { ToastType } from "~/constants";

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
  timerId?: ReturnType<typeof setTimeout>;
}

export type ToastPayload = Omit<Toast, "id">;

export interface ToastOptions {
  message: string;
  duration?: number;
}
