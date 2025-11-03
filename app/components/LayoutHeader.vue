<script setup lang="ts">
const listLinks = [
  { name: "Shop", path: "/catalog" },
  { name: "About Us", path: "/about" },
];

const additionalLinks = [
  { path: "/search", icon: "bar-outline" },
  { path: "/cart", icon: "bar-outline" },
  { path: "/favorites", icon: "bar-outline" },
  { path: "/account", icon: "bar-outline" },
];
</script>

<template>
  <div class="header">
    <NuxtLink to="/">
      <Icon name="icon:bar-outline" size="30" />
    </NuxtLink>
    <div class="header__content">
      <div class="header__menu">
        <NuxtLink
          v-for="(link, index) in listLinks"
          :key="index"
          :to="link.path"
        >
          {{ link.name }}
        </NuxtLink>
      </div>
      <div class="header__hr"></div>
      <div class="header__icons">
        <NuxtLink
          v-for="(link, index) in additionalLinks"
          :key="index"
          :to="link.path"
        >
          <Icon :name="`icon:${link.icon}`" size="21" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  margin: 0 auto;
  max-width: 1248px;
  display: flex;
  justify-content: space-between;
  margin-top: 48px;
  border-block-end: 1px solid var(--color-gray);

  & .header__content {
    display: flex;
    gap: 60px;
    align-items: center;

    & .header__hr {
      align-self: flex-start;
      border-inline-start: 1px solid var(--color-dark-gray);
      height: 17px;
      margin-block-start: 4px;
    }

    & .header__menu {
      display: flex;
      gap: 60px;
      align-items: center;
      padding-block-end: 48px;
    }

    & .header__icons {
      padding-block-end: 48px;
      display: flex;
      gap: 40px;
      align-items: center;
    }

    & .header__menu,
    & .header__icons {
      a {
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 27px;
        color: var(--color-dark-gray);
        text-decoration: none;

        :hover {
          color: var(--color-black);
        }

        &.router-link-active {
          border-block-end: 1px solid var(--color-black);
        }
      }
    }
  }
}
</style>
