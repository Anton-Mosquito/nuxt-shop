<template>
  <div class="min-h-screen flex flex-col">
    <header class="w-full z-50">
      <LayoutDefaultHeader />
    </header>

    <main class="flex-1 w-full max-w-7xl mx-auto px-4 py-10">
      <slot />
    </main>

    <footer
      class="w-full mt-auto max-w-screen-xl mx-auto flex flex-col gap-6 py-5 px-4"
    >
      <LayoutDefaultFooter />
    </footer>
  </div>
</template>
