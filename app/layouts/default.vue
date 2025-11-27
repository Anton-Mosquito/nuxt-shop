<template>
  <div>
    <LayoutDefaultHeader />
    <slot />
    <!-- Debug panel тільки в development -->
    <DevOnly>
      <PerformanceMonitor />
      <DebugPanel />
    </DevOnly>
    <LayoutDefaultFooter />
  </div>
</template>
