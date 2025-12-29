import type { Toast, ToastPayload, ToastOptions } from "~/types";

export function useToast() {
  const toasts = useState<Toast[]>("toasts", () => []);
  const baseId = useId();
  let idCounter = 0;

  const addToast = (toast: ToastPayload) => {
    const id = `${baseId}-${++idCounter}`;
    const duration = toast.duration ?? 3000;
    let timerId: ReturnType<typeof setTimeout> | undefined;

    if (duration > 0) {
      timerId = setTimeout(() => removeToast(id), duration);
    }

    const newToast: Toast = { ...toast, id, timerId };
    toasts.value.push(newToast);

    return id;
  };

  const removeToast = (id: string) => {
    const toast = toasts.value.find((t) => t.id === id);

    if (!toast) return;
    if (toast.timerId) clearTimeout(toast.timerId);

    toasts.value = toasts.value.filter((t) => t.id !== id);
  };

  const success = (options: ToastOptions) =>
    addToast({ type: "success", ...options });

  const error = (options: ToastOptions) =>
    addToast({ type: "error", ...options });

  const warning = (options: ToastOptions) =>
    addToast({ type: "warning", ...options });

  const info = (options: ToastOptions) =>
    addToast({ type: "info", ...options });

  return {
    toasts: readonly(toasts),
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
  };
}
