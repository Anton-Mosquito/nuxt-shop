export const TOAST_CONFIG = {
  success: {
    icon: "ic:baseline-check-circle",
    bgClass: "bg-green-500",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  error: {
    icon: "ic:outline-cancel",
    bgClass: "bg-red-500",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
  warning: {
    icon: "ic:outline-warning",
    bgClass: "bg-yellow-500",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  info: {
    icon: "ic:outline-info",
    bgClass: "bg-blue-500",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
} as const;


export type ToastType = keyof typeof TOAST_CONFIG;