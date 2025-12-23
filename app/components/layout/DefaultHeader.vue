<script setup lang="ts">
const {
  mobileMenuOpen,
  openDropdowns,
  toggleDropdown,
  handleDropdownKeydown,
  closeMobileMenu,
  toggleMobileMenu,
  handleLogout,
} = useNavigation();

const { iconNavigationWithBadges } = useNavigationBadges();
</script>

<template>
  <nav
    class="bg-white shadow-md sticky top-0 z-40 border-b border-[#e5e5e5]"
    role="navigation"
    aria-label="Main navigation"
  >
    <div class="max-w-screen-xl mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <NuxtLink
          to="/"
          class="flex items-center transition-colors text-[var(--color-accent)] hover:text-[var(--color-black-hover)]"
          aria-label="Nuxt Shop - return to home"
          :prefetch="false"
        >
          <Icon name="icon:shop-outline" size="40" aria-hidden="true" />
        </NuxtLink>

        <div class="hidden md:flex items-center gap-12">
          <NavigationDesktop
            :open-dropdowns="openDropdowns"
            @toggle-dropdown="toggleDropdown"
            @dropdown-keydown="handleDropdownKeydown"
          />

          <div class="h-5 border-l border-[#ccc]" aria-hidden="true"></div>

          <NavigationDesktopIcon
            :open-dropdowns="openDropdowns"
            :icon-navigation="iconNavigationWithBadges"
            @toggle-dropdown="toggleDropdown"
            @dropdown-keydown="handleDropdownKeydown"
            @logout="handleLogout"
          />
        </div>

        <NavigationMobileMenuButton
          :is-open="mobileMenuOpen"
          @toggle="toggleMobileMenu"
        />
      </div>

      <NavigationMobile
        :is-open="mobileMenuOpen"
        :open-dropdowns="openDropdowns"
        :icon-navigation="iconNavigationWithBadges"
        @toggle-dropdown="toggleDropdown"
        @close="closeMobileMenu"
        @logout="handleLogout"
      />
    </div>
  </nav>
</template>
