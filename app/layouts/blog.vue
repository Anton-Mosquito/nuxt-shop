<!-- layouts/blog.vue -->
<template>
  <div class="min-h-screen flex flex-col">
    <header id="navigation">
      <AccessibleNavigation />
    </header>
    <main id="main-content" class="flex-1" tabindex="-1">
      <NuxtPage />
    </main>

    <footer id="footer" class="bg-gray-900 text-white py-12">
      <!-- Footer content -->
    </footer>

    <!-- Development only debug panel -->
    <DevOnly>
      <DebugPanel />
    </DevOnly>
  </div>
</template>
