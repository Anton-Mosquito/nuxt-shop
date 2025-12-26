<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4"
  >
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <NuxtLink to="/" class="inline-block">
          <span class="text-4xl">🚀</span>
          <h1 class="text-3xl font-bold text-white mt-2">MyApp</h1>
        </NuxtLink>
      </div>

      <!-- Auth card -->
      <div class="bg-white rounded-2xl shadow-2xl p-8">
        <slot />
      </div>

      <!-- Footer -->
      <p class="text-center text-white text-sm mt-6">
        © 2024 MyApp. Всі права захищені.
      </p>
    </div>
  </div>
</template>
