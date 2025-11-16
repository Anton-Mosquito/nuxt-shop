<script setup lang="ts">
import { NAV_LINKS, HEADER_ICON_LINKS } from "~/constants/navigation";
</script>

<template>
  <div class="header">
    <NuxtLink to="/"
      ><Icon name="icon:shop-outline" size="40" class="icon-accent"
    /></NuxtLink>
    <div class="header__content">
      <div class="header__menu">
        <NuxtLink
          v-for="({ path, name }, index) in NAV_LINKS"
          :key="index"
          :to="path"
        >
          {{ name }}
        </NuxtLink>
      </div>
      <div class="header__hr"></div>
      <div class="header__icons">
        <NuxtLink
          v-for="({ path, icon, label }, index) in HEADER_ICON_LINKS"
          :key="index"
          :to="path"
          :title="label"
        >
          <Icon :name="icon" size="21" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  max-width: 1248px;
  margin: 0 auto;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
}

.header__content {
  display: flex;
  gap: 48px;
  align-items: center;
}

.header__hr {
  border-left: 1px solid #ccc;
  height: 20px;
}

.header__menu {
  display: flex;
  gap: 32px;
  align-items: center;
}

.header__icons {
  display: flex;
  gap: 24px;
  align-items: center;
}

.header__icons a {
  display: flex;
  align-items: center;
  justify-content: center;
}

.header a {
  color: #666;
  text-decoration: none;
  transition: color 0.2s;
}

.header a:hover {
  color: #000;
}

.icon-accent {
  color: var(--color-accent);

  &:hover {
    color: var(--color-black-hover);
  }
}
</style>
