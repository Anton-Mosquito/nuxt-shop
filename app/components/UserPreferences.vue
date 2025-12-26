<!-- components/UserPreferences.vue -->
<script setup lang="ts">
// Створи компонент що читає/пише в localStorage
// Проблема: localStorage не існує на сервері!

const theme = ref<"light" | "dark">("light");
const fontSize = ref<number>(16);

// Функція для завантаження налаштувань
function loadPreferences() {
  try {
    if (typeof window === "undefined" || typeof localStorage === "undefined") {
      // залишаємо дефолти під SSR
      theme.value = "light";
      fontSize.value = 16;
      return;
    }

    const t = localStorage.getItem("theme");
    theme.value = t === "dark" ? "dark" : "light";

    const f = localStorage.getItem("fontSize");
    fontSize.value = f ? Number(f) : 16;
  } catch {
    // safe fallback if access denied
    theme.value = "light";
    fontSize.value = 16;
  }
}

// Функція для збереження
function savePreferences() {
  try {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      localStorage.setItem("theme", theme.value);
      localStorage.setItem("fontSize", String(fontSize.value));
    }
  } catch {
    /* ignore */
  }
}

// Завантажуємо при монтуванні (тільки на клієнті!)
onMounted(() => {
  loadPreferences();
});

// Автоматичне збереження при зміні
watch([theme, fontSize], () => {
  savePreferences();
});
</script>

<template>
  <div class="p-4 border rounded">
    <h3 class="font-bold mb-4">Налаштування</h3>

    <div class="space-y-4">
      <div>
        <label class="block mb-2">Тема</label>
        <select v-model="theme" class="border p-2 rounded">
          <option value="light">Світла</option>
          <option value="dark">Темна</option>
        </select>
      </div>

      <div>
        <label class="block mb-2">Розмір шрифту: {{ fontSize }}px</label>
        <input
          v-model.number="fontSize"
          type="range"
          min="12"
          max="24"
          class="w-full"
        />
      </div>
    </div>
  </div>
</template>
