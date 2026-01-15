<script setup lang="ts">
const theme = ref<"light" | "dark">("light");
const fontSize = ref<number>(16);

function loadPreferences() {
  try {
    if (typeof window === "undefined" || typeof localStorage === "undefined") {
      theme.value = "light";
      fontSize.value = 16;
      return;
    }

    const t = localStorage.getItem("theme");
    theme.value = t === "dark" ? "dark" : "light";

    const f = localStorage.getItem("fontSize");
    fontSize.value = f ? Number(f) : 16;
  } catch {
    theme.value = "light";
    fontSize.value = 16;
  }
}

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

onMounted(() => {
  loadPreferences();
});

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
