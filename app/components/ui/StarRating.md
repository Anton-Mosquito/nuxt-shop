# UiStarRating Component

Universal star rating component that supports both display (read-only) and interactive (input) modes.

## Features

- **Display Mode**: Shows star rating with support for half-stars (e.g., 3.5 stars)
- **Interactive Mode**: Allows user to select rating with hover preview
- **Customizable Size**: Adjustable star size via `size` prop
- **Configurable Max Stars**: Default 5 stars, customizable via `maxStars` prop
- **V-Model Support**: Two-way binding for interactive mode
- **Hover Effects**: Visual feedback with scale animation on hover (interactive mode)
- **Keyboard Accessible**: Focus visible outlines for keyboard navigation
- **Icons**: Uses Nuxt Icon with Material Design Icons (mdi:star, mdi:star-outline, mdi:star-half)

## Props

| Prop         | Type    | Default  | Description                                      |
| ------------ | ------- | -------- | ------------------------------------------------ |
| `rating`     | number  | 0        | Current rating value (display mode)              |
| `maxStars`   | number  | 5        | Maximum number of stars                          |
| `size`       | string  | '16px'   | Size of star icons                               |
| `interactive`| boolean | false    | Enable interactive mode (clickable stars)        |

## Usage

### Display Mode (Read-Only)

Used to show existing ratings in product reviews, ratings displays, etc.

```vue
<script setup>
const productRating = 4.5
</script>

<template>
  <!-- Basic usage -->
  <UiStarRating :rating="4" />

  <!-- With half stars -->
  <UiStarRating :rating="productRating" size="20px" />

  <!-- Custom max stars -->
  <UiStarRating :rating="3" :maxStars="10" size="16px" />

  <!-- In review list -->
  <div v-for="review in reviews" :key="review.id">
    <div class="review-header">
      <span>{{ review.name }}</span>
      <UiStarRating :rating="review.rating" size="18px" />
    </div>
    <p>{{ review.text }}</p>
  </div>
</template>
```

### Interactive Mode (Rating Input)

Used in forms where users can select their own rating.

```vue
<script setup>
const userRating = ref(0)

// With v-model
const formData = ref({
  rating: 0,
  comment: ''
})

const handleSubmit = () => {
  console.log('User rating:', userRating.value)
}
</script>

<template>
  <!-- Basic interactive usage -->
  <UiStarRating v-model="userRating" interactive size="32px" />

  <!-- In a form -->
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label>Your Rating*</label>
      <UiStarRating v-model="formData.rating" interactive size="32px" />
    </div>

    <div class="form-group">
      <label>Comment</label>
      <textarea v-model="formData.comment"></textarea>
    </div>

    <button type="submit">Submit Review</button>
  </form>
</template>
```

### With Event Handling

```vue
<script setup>
const selectedRating = ref(0)

const handleRatingChange = (newRating: number) => {
  console.log('Rating changed to:', newRating)
  // Additional logic...
}
</script>

<template>
  <UiStarRating
    v-model="selectedRating"
    interactive
    size="28px"
    @update:rating="handleRatingChange"
  />
</template>
```

## Visual Behavior

### Display Mode
- **Filled Stars**: Black (--color-black)
- **Half Stars**: Black with 50% opacity
- **Empty Stars**: Gray outline (--color-gray)
- Displays fractional ratings (e.g., 3.5 shows 3 filled + 1 half + 1 empty)

### Interactive Mode
- **Default**: Gray outline stars
- **Hover**: Stars light up as you hover, scaling up 10%
- **Selected**: Black filled stars
- **Focus**: 2px accent color outline for keyboard navigation

## Accessibility

- **ARIA Labels**: Interactive buttons include descriptive aria-label (e.g., "Rate 4 out of 5 stars")
- **Keyboard Navigation**: Supports focus and activation via keyboard
- **Visual Feedback**: Clear focus indicators for screen reader users
- **aria-hidden**: Star icons marked as decorative

## Styling

The component uses CSS custom properties for theming:

```css
--color-black: /* Filled star color */
--color-gray: /* Empty star color */
--color-accent: /* Focus outline color */
```

## TypeScript Support

```typescript
interface Props {
  rating?: number       // Display rating value
  maxStars?: number     // Maximum stars (default: 5)
  size?: string         // Icon size (default: '16px')
  interactive?: boolean // Enable interactive mode (default: false)
}

interface Emits {
  'update:rating': [rating: number] // Emitted on rating change (interactive mode)
}
```

## Examples in Codebase

### Product Reviews Display
```vue
<!-- app/components/product/Reviews.vue -->
<UiStarRating :rating="review.rating" size="20px" />
```

### Review Form Input
```vue
<!-- app/components/product/Reviews.vue -->
<UiStarRating v-model="newReview.rating" interactive size="32px" />
```

## Implementation Notes

- **Half Star Logic**: Only works in display mode (non-interactive)
- **Interactive Mode**: No half stars, whole numbers only (1-5)
- **Hover State**: Provides visual preview before clicking in interactive mode
- **V-Model**: Uses `defineModel` for two-way binding (Vue 3.3+)
- **Icon Library**: Requires Nuxt Icon module with Material Design Icons

## Browser Support

Modern browsers supporting:
- CSS custom properties (v-bind in styles)
- CSS transitions
- Flexbox
- SVG icons

## Performance

- Lightweight component with minimal overhead
- No external dependencies (uses Nuxt Icon)
- Efficient rendering with v-for and computed properties
- Hover state managed with local ref (no global state)
