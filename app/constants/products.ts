// Product categories
export const PRODUCT_CATEGORIES = [
  { id: "earrings", name: "Сережки", slug: "earrings" },
  { id: "necklaces", name: "Намиста", slug: "necklaces" },
  { id: "bracelets", name: "Браслети", slug: "bracelets" },
  { id: "rings", name: "Кільця", slug: "rings" },
] as const;

// Sort options
export const SORT_OPTIONS = [
  { value: "newest", label: "Спочатку нові" },
  { value: "price-asc", label: "Ціна: від низької" },
  { value: "price-desc", label: "Ціна: від високої" },
  { value: "popular", label: "Популярні" },
] as const;

// Filter options
export const PRICE_RANGES = [
  { min: 0, max: 50, label: "До $50" },
  { min: 50, max: 100, label: "$50 - $100" },
  { min: 100, max: 200, label: "$100 - $200" },
  { min: 200, max: null, label: "Від $200" },
] as const;
