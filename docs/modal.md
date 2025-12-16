# Modal Component Documentation

Компонент `Modal.vue` надає гнучке та доступне рішення для створення модальних вікон у вашому Nuxt додатку.

## Основне використання

### Імпорт

Компонент автоматично імпортується завдяки Nuxt auto-imports. Просто використовуйте `<Modal>` у вашому шаблоні.

### Базовий приклад

```vue
<script setup lang="ts">
const showModal = ref(false);

function handleSave() {
  console.log("Saving...");
  showModal.value = false;
}
</script>

<template>
  <button @click="showModal = true">
    Відкрити модалку
  </button>

  <Modal v-model="showModal" title="Редагувати профіль">
    <form class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Ім'я</label>
        <input type="text" class="w-full px-3 py-2 border rounded-lg" />
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Email</label>
        <input type="email" class="w-full px-3 py-2 border rounded-lg" />
      </div>
    </form>

    <template #footer="{ close }">
      <button @click="close">Скасувати</button>
      <button @click="handleSave">Зберегти</button>
    </template>
  </Modal>
</template>
```

## API Reference

### Props

| Prop | Type | Default | Опис |
|------|------|---------|------|
| `modelValue` | `boolean` | `false` | Контролює видимість модалки (v-model) |
| `title` | `string` | `undefined` | Заголовок модалки |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Розмір модалки |
| `persistent` | `boolean` | `false` | Заборонити закриття через backdrop або Escape |
| `closeOnEscape` | `boolean` | `true` | Закривати модалку при натисканні Escape |
| `closeOnBackdrop` | `boolean` | `true` | Закривати модалку при кліку на backdrop |

### Events

| Event | Payload | Опис |
|-------|---------|------|
| `update:modelValue` | `boolean` | Емітується при зміні стану видимості |
| `close` | - | Емітується при закритті модалки |
| `open` | - | Емітується при відкритті модалки |

### Slots

| Slot | Props | Опис |
|------|-------|------|
| `default` | - | Основний контент модалки |
| `header` | `{ close: () => void }` | Кастомний заголовок (замінює title) |
| `footer` | `{ close: () => void }` | Футер модалки з кнопками дій |

## Приклади використання

### 1. Проста модалка з формою

```vue
<script setup lang="ts">
const showModal = ref(false);

function handleSave() {
  // Логіка збереження
  showModal.value = false;
}
</script>

<template>
  <Modal v-model="showModal" title="Редагувати профіль" size="lg">
    <form class="space-y-4">
      <!-- Поля форми -->
    </form>

    <template #footer="{ close }">
      <button @click="close">Скасувати</button>
      <button @click="handleSave">Зберегти</button>
    </template>
  </Modal>
</template>
```

### 2. Confirmation Dialog

```vue
<script setup lang="ts">
const showConfirmModal = ref(false);

function handleDelete() {
  console.log("Deleting...");
  showConfirmModal.value = false;
}
</script>

<template>
  <Modal v-model="showConfirmModal" size="sm" persistent>
    <div class="text-center">
      <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
        <Icon name="heroicons-outline:exclamation-triangle" class="w-8 h-8 text-red-600" />
      </div>
      <h3 class="text-lg font-bold mb-2">Видалити елемент?</h3>
      <p class="text-gray-600 text-sm mb-6">Цю дію не можна буде скасувати</p>
    </div>

    <template #footer>
      <button @click="showConfirmModal = false">Скасувати</button>
      <button @click="handleDelete">Видалити</button>
    </template>
  </Modal>
</template>
```

### 3. Модалка з кастомним заголовком

```vue
<template>
  <Modal v-model="showModal" size="md">
    <template #header="{ close }">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <Icon name="heroicons-outline:information-circle" />
          <h3>Кастомний заголовок</h3>
        </div>
        <button @click="close">×</button>
      </div>
    </template>

    <p>Контент модалки</p>
  </Modal>
</template>
```

### 4. Модалка без футера

```vue
<template>
  <Modal v-model="showModal" title="Інформація">
    <p>Ця модалка не має футера. Закривається тільки через кнопку × або Escape.</p>
  </Modal>
</template>
```

### 5. Persistent Modal (не закривається)

```vue
<template>
  <Modal v-model="showModal" title="Важливо" persistent>
    <p>Ця модалка не закриється при кліку на backdrop або Escape.</p>
    <p>Потрібно явно натиснути кнопку закриття.</p>
    
    <template #footer="{ close }">
      <button @click="close">Зрозуміло</button>
    </template>
  </Modal>
</template>
```

## Розміри модалок

| Size | Width | Використання |
|------|-------|--------------|
| `sm` | 400px | Confirm dialogs, alerts |
| `md` | 600px | Стандартні форми (default) |
| `lg` | 800px | Складні форми з багатьма полями |
| `xl` | 1000px | Великі форми або складний контент |

```vue
<Modal size="sm">Маленька модалка</Modal>
<Modal size="md">Середня модалка</Modal>
<Modal size="lg">Велика модалка</Modal>
<Modal size="xl">Дуже велика модалка</Modal>
```

## Best Practices

### ✅ DO

```vue
<!-- Використовуйте v-model для контролю видимості -->
<Modal v-model="showModal" title="Заголовок">
  <p>Контент</p>
</Modal>

<!-- Використовуйте slot props для закриття -->
<template #footer="{ close }">
  <button @click="close">Закрити</button>
</template>

<!-- Використовуйте persistent для важливих дій -->
<Modal persistent>
  <p>Важлива інформація</p>
</Modal>

<!-- Встановлюйте розмір залежно від контенту -->
<Modal size="sm">Маленький контент</Modal>
<Modal size="lg">Багато контенту</Modal>
```

### ❌ DON'T

```vue
<!-- Не керуйте видимістю вручну через props -->
<Modal :model-value="showModal" @update:model-value="showModal = $event">
  <!-- Замість цього використовуйте v-model -->
</Modal>

<!-- Не створюйте модалку без можливості закриття -->
<Modal persistent>
  <p>Немає кнопки закриття!</p>
  <!-- Завжди додавайте спосіб закрити persistent модалку -->
</Modal>

<!-- Не використовуйте занадто великі розміри для простого контенту -->
<Modal size="xl">
  <p>Один рядок тексту</p>
</Modal>
```

## Accessibility

Компонент Modal автоматично підтримує accessibility features:

- ✅ `role="dialog"` та `aria-modal="true"`
- ✅ `aria-labelledby` для заголовка
- ✅ Focus trap (фокус залишається всередині модалки)
- ✅ Escape key для закриття
- ✅ Backdrop click для закриття
- ✅ Scroll lock (блокує прокрутку фону)
- ✅ Повернення фокуса після закриття

## Тестування

```typescript
import { mount } from '@vue/test-utils'
import Modal from '~/components/ui/Modal.vue'

describe('Modal', () => {
  it('opens and closes', async () => {
    const wrapper = mount(Modal, {
      props: { modelValue: false }
    })

    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)

    await wrapper.setProps({ modelValue: true })
    expect(wrapper.find('[role="dialog"]').exists()).toBe(true)

    await wrapper.find('[role="dialog"]').trigger('keydown.escape')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })
})
```

## Troubleshooting

### Модалка не відкривається

Перевірте, що ви використовуєте `v-model` або правильно обробляєте `update:modelValue`:

```vue
<!-- ✅ Правильно -->
<Modal v-model="showModal" />

<!-- ❌ Неправильно -->
<Modal :model-value="showModal" />
```

### Модалка не закривається

Якщо використовується `persistent`, модалка не закриється при кліку на backdrop або Escape. Додайте явну кнопку закриття:

```vue
<Modal persistent>
  <template #footer="{ close }">
    <button @click="close">Закрити</button>
  </template>
</Modal>
```

### Стилі не застосовуються

Переконайтеся, що ви використовуєте Tailwind CSS класи і вони правильно сконфігуровані у вашому проєкті.

