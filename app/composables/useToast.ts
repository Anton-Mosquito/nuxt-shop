import type { Toast, ToastPayload } from "~/types";

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

  const success = (message: string, duration?: number) =>
    addToast({ type: "success", message, duration });

  const error = (message: string, duration?: number) =>
    addToast({ type: "error", message, duration });

  const warning = (message: string, duration?: number) =>
    addToast({ type: "warning", message, duration });

  const info = (message: string, duration?: number) =>
    addToast({ type: "info", message, duration });

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
