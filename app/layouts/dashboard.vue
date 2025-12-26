<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main content area -->
    <div class="flex-1 flex flex-col">
      <!-- Top bar -->
      <header class="bg-white shadow-sm sticky top-0 z-30">
        <div class="px-6 py-4 flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">
              {{ route.meta.title || "Dashboard" }}
            </h1>
          </div>

          <div class="flex items-center gap-4">
            <!-- Notifications -->
            <button class="relative p-2 text-gray-600 hover:text-gray-900">
              <Icon
                name="ic:outline-notifications"
                class="w-6 h-6"
                aria-hidden="true"
              />
              <span
                class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
              ></span>
            </button>

            <!-- User menu -->
            <div class="flex items-center gap-3">
              <UserAvatar src="/images/admin.jpg" alt="Admin" size="sm" />
              <span class="text-sm font-medium">Адмін</span>
            </div>
          </div>
        </div>
      </header>

      <slot />

      <!-- Debug panel тільки в development -->
      <DevOnly>
        <PerformanceMonitor />
        <DashboardDebugPanel />
      </DevOnly>
    </div>
  </div>
</template>
