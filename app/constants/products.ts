/**
 * Product categories
 * Note: These should match categories from the API
 */
export const PRODUCT_CATEGORIES = [
  { id: "earrings", name: "Сережки", slug: "earrings" },
  { id: "necklaces", name: "Намиста", slug: "necklaces" },
  { id: "bracelets", name: "Браслети", slug: "bracelets" },
  { id: "rings", name: "Кільця", slug: "rings" },
] as const;

/**
 * Product sort options
 * Values should match ProductSortOption from ~/types/components/product/filters
 */
export const SORT_OPTIONS = [
  { value: "newest", label: "Спочатку нові" },
  { value: "price-asc", label: "Ціна: від низької" },
  { value: "price-desc", label: "Ціна: від високої" },
  { value: "popular", label: "Популярні" },
] as const;

/**
 * Price range filter options
 * Used in product catalog filtering
 */
export const PRICE_RANGES = [
  { min: 0, max: 50, label: "До $50" },
  { min: 50, max: 100, label: "$50 - $100" },
  { min: 100, max: 200, label: "$100 - $200" },
  { min: 200, max: null, label: "Від $200" },
] as const;

/**
 * Product detail tabs
 * Used in product detail page
 */
export const PRODUCT_TABS = [
  {
    id: "description",
    label: "Description",
    icon: "ic:baseline-description",
  },
  {
    id: "reviews",
    label: "Reviews",
    icon: "ic:baseline-star-border",
  },
  {
    id: "specifications",
    label: "Specifications",
    icon: "ic:baseline-format-list-bulleted",
    disabled: true,
  },
] as const;
