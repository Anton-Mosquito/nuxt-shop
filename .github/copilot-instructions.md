# Nuxt Shop - E-Commerce Application Development Instructions

## Project Overview

This is a modern e-commerce shop application built with Nuxt 4, featuring product catalog, shopping cart, user authentication, favorites management, and admin capabilities. The project demonstrates best practices for building production-ready Nuxt applications with TypeScript, server-side rendering, and API integration.

## Technology Stack & Versions

- **Framework**: Nuxt 4.2+ (Vue 3 with Composition API)
- **Language**: TypeScript (strict mode)
- **State Management**: Pinia 3.x with persistence
- **CSS Framework**: Tailwind CSS 3.x with PostCSS nesting
- **UI Components**: Custom component library with Nuxt Icon
- **Image Optimization**: @nuxt/image for optimized image delivery
- **SEO**: @nuxtjs/sitemap, @nuxtjs/robots for SEO optimization
- **Fonts**: @nuxt/fonts for optimized font loading
- **Database**: Nitro experimental database with Redis/FS-lite
- **Utilities**: @vueuse/nuxt for composition utilities
- **Testing**: @nuxt/test-utils for testing infrastructure
- **Package Manager**: npm
- **Linting**: ESLint 9.x with @nuxt/eslint

## Repository Structure

```
d:\templates\nuxt-shop\
├── app/                          # Application source code
│   ├── components/               # Vue components
│   │   ├── ui/                   # UI components (Button, Input, Pagination, etc.)
│   │   ├── layout/               # Layout components (Header, Footer)
│   │   ├── product/              # Product-specific components (Grid, Slider, Reviews, etc.)
│   │   ├── ActionButton.vue      # Reusable action buttons
│   │   ├── AddFavorite.vue       # Favorite toggle component
│   │   ├── CatalogCard.vue       # Product card component
│   │   ├── InputField.vue        # Form input wrapper
│   │   └── SelectField.vue       # Select dropdown wrapper
│   ├── composables/              # Composable functions
│   │   └── useAPI.ts             # API configuration composable
│   ├── constants/                # Application constants
│   │   ├── index.ts              # General constants
│   │   ├── navigation.ts         # Navigation menu structure
│   │   ├── products.ts           # Product-related constants
│   │   └── ui.ts                 # UI-related constants
│   ├── interfaces/               # TypeScript interfaces
│   │   ├── auth.interface.ts     # Authentication types
│   │   ├── category.interface.ts # Category types
│   │   ├── favorite.interface.ts # Favorites types
│   │   ├── product.interface.ts  # Product types
│   │   ├── review.interface.ts   # Review types
│   │   └── user.interface.ts     # User types
│   ├── layouts/                  # Layout templates
│   │   ├── default.vue           # Default layout with header/footer
│   │   └── auth.vue              # Authentication layout
│   ├── middleware/               # Route middleware
│   │   ├── 01-logger.global.ts   # Global logging middleware
│   │   └── auth.ts               # Authentication guard
│   ├── pages/                    # File-based routing pages
│   │   ├── index.vue             # Homepage
│   │   ├── about.vue             # About page
│   │   ├── cart.vue              # Shopping cart
│   │   ├── favorites.vue         # Favorites list
│   │   ├── account/              # User account pages
│   │   ├── auth/                 # Authentication pages (login, register, restore)
│   │   └── catalog/              # Product catalog pages
│   ├── stores/                   # Pinia stores
│   │   ├── auth.store.ts         # Authentication state
│   │   └── favorite.store.ts     # Favorites management
│   ├── types/                    # TypeScript types
│   │   ├── common.ts             # Common types
│   │   ├── components.ts         # Component-specific types
│   │   └── index.ts              # Type exports
│   ├── assets/                   # Static assets
│   │   ├── fonts/                # Custom fonts
│   │   ├── icons/                # Custom SVG icons
│   │   └── styles/               # Global styles
│   ├── app.config.ts             # App runtime configuration
│   ├── app.vue                   # Root component
│   └── error.vue                 # Error page component
├── server/                       # Server-side code
│   ├── api/                      # API endpoints
│   │   ├── favorites/            # Favorites API routes
│   │   ├── products/             # Products API routes
│   │   └── sitemap/              # Sitemap generation
│   └── middleware/               # Server middleware
│       └── log.ts                # Server-side logging
├── public/                       # Static public files
│   ├── icons/                    # PWA icons
│   ├── manifest.webmanifest      # PWA manifest
│   └── _robots.txt               # Robots.txt template
├── db/                           # Local database storage (dev)
├── .github/                      # GitHub configuration
│   └── instructions/             # Development instructions
├── nuxt.config.ts                # Nuxt configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── postcss.config.js             # PostCSS configuration
├── tsconfig.json                 # TypeScript configuration
└── eslint.config.mjs             # ESLint configuration
```

## Nuxt 4 Component Development Guidelines

### Component Architecture

This project follows Nuxt 4 best practices with a modular component structure:

#### Component Categories

- **UI Components** (`components/ui/`): Reusable UI elements (Button, Input, Notification, Pagination, RangeSlider, DiscountToggle)
- **Layout Components** (`components/layout/`): Header, Footer, and layout-specific elements
- **Product Components** (`components/product/`): Product-specific features (Grid, Slider, ImageGallery, Info, Reviews, Tabs)
- **Feature Components** (root `components/`): Business logic components (CatalogCard, AddFavorite, ActionButton, InputField, SelectField)

### Component Development Standards

- **Single File Components**: Use `.vue` extension with `<script setup lang="ts">`, `<template>`, `<style scoped>` structure
- **Composition API**: Always use Composition API with `<script setup>` for all components
- **TypeScript**: Strict TypeScript typing for props, emits, and component logic
- **Auto-imports**: Leverage Nuxt auto-imports for Vue APIs, composables, and components
- **Component Prefixes**: Components are auto-prefixed based on directory (Ui*, Layout*, Product\*)

### Nuxt-Specific Patterns

- **Pages**: Use `pages/` directory for file-based routing
- **Layouts**: Define layouts in `layouts/` directory, specify with `definePageMeta({ layout: 'name' })`
- **Middleware**: Use `middleware/` for route guards and logic (auth, logging, etc.)
- **Server API**: Create API endpoints in `server/api/` using Nitro
- **Composables**: Place reusable logic in `composables/` with `use*` naming convention
- **Auto-imports**: Components, composables, and utilities are auto-imported by Nuxt

## TypeScript Guidelines

### Type System

- **Interfaces vs Types**: Use `interface` for data models, `type` for utility types and unions
- **Type Location**: Define types in `interfaces/` for data models, `types/` for utility types
- **Strict Mode**: Project uses strict TypeScript - avoid `any`, use `unknown` or proper types
- **Component Props**: Always type props with interface or type definition

### Type Organization

```typescript
// interfaces/ - Data models
interface Product {
  id: number;
  title: string;
  price: number;
  category: Category;
}

// types/ - Utility types
type ComponentState = "idle" | "loading" | "success" | "error";
type PropsWithDefaults<T> = Required<T>;
```

## State Management with Pinia

### Store Structure

- **Composition API Stores**: Use setup syntax with `defineStore(() => { ... })`
- **Persistence**: Stores use `pinia-plugin-persistedstate` for localStorage persistence
- **Store Location**: All stores in `app/stores/` with `*.store.ts` naming
- **Store Naming**: Use `use*Store` convention (e.g., `useAuthStore`, `useFavoriteStore`)

### Store Pattern

```typescript
export const useAuthStore = defineStore(
  "auth",
  () => {
    // State
    const token = ref<string | undefined>();
    const email = ref<string | undefined>();

    // Actions
    function setToken(newToken: string) {
      token.value = newToken;
    }

    // Return public API
    return { token, email, setToken };
  },
  { persist: true }
);
```

## Tailwind CSS & Styling Guidelines

### Styling Approach

- **Primary**: Use Tailwind utility classes for styling
- **Scoped Styles**: Use `<style scoped>` for component-specific CSS
- **PostCSS Nesting**: Native CSS nesting available via `postcss-nested`
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Custom Classes**: Define complex reusable styles in scoped CSS, utility classes for layout

### CSS Organization

```vue
<template>
  <!-- Use Tailwind utilities for layout/spacing -->
  <div class="flex items-center gap-4 p-6">
    <!-- Use custom classes for complex components -->
    <button class="product-card__action">Add to Cart</button>
  </div>
</template>

<style scoped>
/* Component-specific styles with nesting */
.product-card__action {
  background: theme("colors.blue.500");

  &:hover {
    background: theme("colors.blue.600");
  }

  &:disabled {
    opacity: 0.5;
  }
}
</style>
```

## Coding Standards & Conventions

### Component Naming & Structure

- **Component Files**: PascalCase for component files
  - ✅ `CatalogCard.vue`, `AddFavorite.vue`, `ActionButton.vue`
  - ❌ `catalog-card.vue`, `addFavorite.vue`, `action_button.vue`
- **Component Usage**: Auto-imported, use PascalCase in templates
  - ✅ `<CatalogCard />`, `<UiButton />`, `<ProductGrid />`
  - ❌ `<catalog-card />`, `<ui-button />`
- **Component Prefixes**: Automatic based on directory structure (configured in nuxt.config.ts)

### File & Directory Naming

- **Pages**: kebab-case for page files (`catalog/[id].vue`, `auth/login.vue`)
- **Composables**: camelCase starting with `use` (`useAPI.ts`, `useFavorites.ts`)
- **Stores**: camelCase ending with `.store.ts` (`auth.store.ts`)
- **Types/Interfaces**: camelCase ending with `.interface.ts` or `.ts` (`product.interface.ts`)
- **Constants**: camelCase or UPPER_SNAKE_CASE in files (`navigation.ts`, `products.ts`)

### Code Quality Standards

- **Variable Naming**: Descriptive camelCase names
  - ✅ `productList`, `currentUser`, `isLoading`
  - ❌ `data`, `temp`, `x`
- **Function Naming**: Action verbs in camelCase
  - ✅ `fetchProducts()`, `addToCart()`, `validateEmail()`
  - ❌ `products()`, `cart()`, `email()`
- **Constant Naming**: UPPER_SNAKE_CASE for true constants
  - ✅ `MAX_ITEMS_PER_PAGE`, `API_BASE_URL`
  - ❌ `MaxItems`, `apiUrl`

## Project-Specific Implementation Guidelines

### E-Commerce Features

- **Product Catalog**: Grid/list view with filtering, sorting, pagination
- **Shopping Cart**: State management, quantity updates, price calculations
- **Favorites**: Toggle favorite status, persist across sessions
- **Authentication**: JWT token-based auth with middleware protection
- **User Account**: Profile management, order history
- **Reviews**: Product reviews with ratings

### API Integration

- **Runtime Config**: Use `useRuntimeConfig()` for API URLs and secrets
- **Server Routes**: Define API endpoints in `server/api/`
- **Data Fetching**: Use Nuxt's `useFetch`, `useAsyncData` for data fetching
- **Error Handling**: Proper error handling for API calls with user feedback

### SEO & Performance

- **Meta Tags**: Use `useHead()` or `useSeoMeta()` for page metadata
- **Sitemap**: Auto-generated via `@nuxtjs/sitemap` module
- **Robots.txt**: Configured in `nuxt.config.ts` with `@nuxtjs/robots`
- **Image Optimization**: Use `<NuxtImg>` and `<NuxtPicture>` components
- **Code Splitting**: Automatic with Nuxt, use lazy components when needed

### Performance Considerations

- **Loading States**: Show loading indicators during data fetching
- **Error Boundaries**: Handle errors gracefully with `error.vue`
- **Lazy Loading**: Use `defineAsyncComponent` for heavy components
- **Image Optimization**: Always use `@nuxt/image` for optimized images
- **Font Optimization**: Fonts handled by `@nuxt/fonts` module

## Development Workflow & Best Practices

### When Creating New Features:

1. **Component Planning**: Check existing components in `app/components/`
2. **Type Definitions**: Define interfaces in `app/interfaces/` before implementation
3. **State Management**: Determine if Pinia store needed or local state sufficient
4. **API Integration**: Create server routes if backend communication needed
5. **Styling**: Start with Tailwind utilities, add scoped styles for complex components
6. **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
7. **Responsive Design**: Test on mobile/tablet breakpoints
8. **TypeScript**: Ensure all props, functions, and data are properly typed

### Creating New Pages

```typescript
<script setup lang="ts">
// Define page metadata
definePageMeta({
  layout: 'default', // or 'auth'
  middleware: ['auth'], // optional authentication
});

// SEO metadata
useHead({
  title: 'Page Title',
  meta: [
    { name: 'description', content: 'Page description' }
  ]
});

// Data fetching
const { data: products } = await useFetch('/api/products');
</script>
```

### Creating New Components

```vue
<script setup lang="ts">
// Props with TypeScript
interface Props {
  productId: number;
  showPrice?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showPrice: true,
});

// Emits
interface Emits {
  (e: "add-to-cart", productId: number): void;
  (e: "toggle-favorite", productId: number): void;
}

const emit = defineEmits<Emits>();

// Component logic
const handleAddToCart = () => {
  emit("add-to-cart", props.productId);
};
</script>

<template>
  <div class="product-card">
    <slot name="image" />
    <div class="product-card__content">
      <slot />
    </div>
    <UiButton @click="handleAddToCart"> Add to Cart </UiButton>
  </div>
</template>

<style scoped>
.product-card {
  display: grid;
  gap: 1rem;

  &__content {
    padding: 1rem;
  }
}
</style>
```

### Error Handling Patterns

- **API Errors**: Catch and display user-friendly error messages
- **Validation**: Client-side validation before API calls
- **Loading States**: Show loading indicators during async operations
- **Error Page**: Custom `error.vue` for unhandled errors
- **Notifications**: Use notification component for user feedback

## UI Guidelines & Design Patterns

### Component Library Structure

- **UI Components**: Basic reusable elements (buttons, inputs, notifications)
- **Composition**: Compose complex components from UI primitives
- **Consistency**: Follow established patterns from existing components
- **Props API**: Clear, typed props with sensible defaults

### Form Handling

- **Wrapper Components**: Use `InputField`, `SelectField` for consistent forms
- **Validation**: Client-side validation with clear error messages
- **Two-way Binding**: Use `v-model` for form inputs
- **Submit Handling**: Prevent default, validate, then submit

### User Experience Standards

- **Feedback**: Immediate visual feedback for user actions
- **Loading States**: Show loading indicators for async operations
- **Error Messages**: Clear, actionable error messages
- **Success Notifications**: Confirm successful actions
- **Responsive**: Mobile-friendly touch targets and layouts

## Testing Guidelines

### Testing Approach

- **Component Testing**: Use `@nuxt/test-utils` for component tests
- **Integration Testing**: Test component interactions and data flow
- **E2E Testing**: Test critical user flows (checkout, authentication)
- **API Testing**: Test server routes and API endpoints

### Test Structure

- Write tests alongside components or in dedicated `__tests__` directories
- Use descriptive test names that explain expected behavior
- Mock external dependencies and API calls
- Test edge cases and error conditions

## Common Patterns

When developing features for this e-commerce project, always:

1. **Type Safety**: Define TypeScript interfaces before implementation
2. **State Management**: Use Pinia for shared state, local state for component-only data
3. **API First**: Define server routes before client implementation
4. **Mobile Responsive**: Design mobile-first, enhance for desktop
5. **Accessibility**: Semantic HTML, keyboard navigation, screen reader support
6. **SEO Optimized**: Proper meta tags, structured data, sitemap inclusion
7. **Performance**: Lazy load images, code split heavy components
8. **Error Handling**: Graceful error handling with user feedback
9. **Consistent Styling**: Tailwind utilities first, scoped styles for complex cases
10. **Reusability**: Extract common patterns into composables or components
11. **Documentation**: Comment complex logic and business rules
12. **Security**: Validate inputs, protect routes, secure API endpoints

## Specialized Development Instructions

This project includes detailed instruction files for specific development scenarios. These files provide comprehensive guidance for implementing advanced patterns and features. All instruction files are located in [`instructions/`](instructions/) directory.

### Vue Component Instructions

Located in [`instructions/`](instructions/):

- **[vue-component-index.instructions.md](instructions/vue-component-index.instructions.md)**: Master index organizing all Vue instruction modules
- **[vue-accessibility.instructions.md](instructions/vue-accessibility.instructions.md)**: WCAG compliance and accessibility patterns
- **[vue-async-components.instructions.md](instructions/vue-async-components.instructions.md)**: Async component patterns and lazy loading
- **[vue-basic-structure.instructions.md](instructions/vue-basic-structure.instructions.md)**: Component template structure and setup
- **[vue-error-handling.instructions.md](instructions/vue-error-handling.instructions.md)**: Error boundaries and error management
- **[vue-prop-validation.instructions.md](instructions/vue-prop-validation.instructions.md)**: Professional prop validation patterns
- **[vue-props-events.instructions.md](instructions/vue-props-events.instructions.md)**: Props definition and event handling
- **[vue-script-setup-macros.instructions.md](instructions/vue-script-setup-macros.instructions.md)**: Vue 3.3+ script setup macros
- **[vue-teleport.instructions.md](instructions/vue-teleport.instructions.md)**: Teleport usage and advanced patterns
- **[vue-vmodel.instructions.md](instructions/vue-vmodel.instructions.md)**: V-model implementation and two-way binding
- **[test-generation.instructions.md](instructions/test-generation.instructions.md)**: Comprehensive Vue.js testing strategies
- **[dynamic-patterns.instructions.md](instructions/dynamic-patterns.instructions.md)**: Dynamic slots, arguments, and CSS binding
- **[npm-security.instructions.md](instructions/npm-security.instructions.md)**: NPM security best practices

### Advanced Vue 3 Reactivity Instructions

Located in [`instructions/`](instructions/):

- **[work-with-customRef.instructions.md](instructions/work-with-customRef.instructions.md)**: Custom ref for advanced reactivity control
- **[work-with-effectScope.instructions.md](instructions/work-with-effectScope.instructions.md)**: Effect scope for reactivity management
- **[work-with-reactive-checker.instructions.md](instructions/work-with-reactive-checker.instructions.md)**: Reactive type checking utilities (isProxy, isReactive, isReadonly, isRef)
- **[work-with-shallowReactive-shallowReadonly.instructions.md](instructions/work-with-shallowReactive-shallowReadonly.instructions.md)**: Shallow reactivity optimization
- **[work-with-shallowRef-triggerRef.instructions.md](instructions/work-with-shallowRef-triggerRef.instructions.md)**: Shallow ref performance patterns
- **[work-with-toRaw-markRaw.instructions.md](instructions/work-with-toRaw-markRaw.instructions.md)**: Raw object handling for performance
- **[work-with-toRef-toRefs.instructions.md](instructions/work-with-toRef-toRefs.instructions.md)**: Ref conversion utilities
- **[work-with-toValue.instructions.md](instructions/work-with-toValue.instructions.md)**: Value extraction from refs in composables

### Development Tools & Debugging

Located in [`instructions/`](instructions/):

- **[chrome_devtools_debugging_guide.md](instructions/chrome_devtools_debugging_guide.md)**: Chrome DevTools debugging techniques for Vue/Nuxt applications

### Usage Guidelines

- **Direct Links**: Click on any instruction file name to open it directly
- **File Patterns**: Each instruction file includes `applyTo` patterns for automatic triggering based on file type
- **Integration**: Instructions complement this main guide with specialized, deep-dive content
- **Learning Path**: Reference specific instruction files as needed for advanced patterns
- **Code Quality**: All instructions follow the same standards outlined in this document
- **Auto-apply**: Copilot will automatically reference relevant instruction files based on the file you're editing

---

_This instruction set ensures consistency, maintainability, and high-quality Nuxt 4 development for the e-commerce shop project while following modern best practices and architectural patterns._
