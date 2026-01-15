import type { NavLink } from "~/types/ui/navigation";

/**
 * Footer navigation links
 * Used in: DefaultFooter.vue
 */
export const FOOTER_NAV_LINKS: readonly NavLink[] = [
  { name: "Contacts", path: "/contacts" },
  { name: "Terms and Conditions", path: "/terms" },
  { name: "Delivery and Refund Policy", path: "/delivery-refund" },
] as const;

/**
 * Footer informational links
 * Used in: DefaultFooter.vue
 */
export const FOOTER_INFO_LINKS: readonly NavLink[] = [
  { name: "About Us", path: "/about" },
  { name: "Delivery", path: "/delivery" },
  { name: "Returns", path: "/returns" },
] as const;

/**
 * Breadcrumb labels mapping
 * Used in: Breadcrumbs.vue
 */
export const BREADCRUMB_LABELS: Record<string, string> = {
  "": "Головна",
  dashboard: "Dashboard",
  users: "Користувачі",
  products: "Продукти",
  orders: "Замовлення",
  analytics: "Аналітика",
  settings: "Налаштування",
  new: "Створити",
  edit: "Редагувати",
  categories: "Категорії",
  inventory: "Інвентар",
  general: "Загальні",
  security: "Безпека",
  notifications: "Сповіщення",
  integrations: "Інтеграції",
  account: "Акаунт",
  auth: "Авторизація",
  login: "Вхід",
  register: "Реєстрація",
  cart: "Кошик",
  favorites: "Обране",
  catalog: "Каталог",
};

