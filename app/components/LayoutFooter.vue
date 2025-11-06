<script setup lang="ts">
const listLinks = [
  { name: "Contacts", path: "/" },
  { name: "Terms and Conditions", path: "/about" },
  { name: "Delivery and Refund Policy", path: "/contact" },
];

const iconLinks = [
  { name: "Contacts", path: "/" },
  { name: "Terms and Conditions", path: "/about" },
  { name: "Delivery and Refund Policy", path: "/contact" },
];
</script>

<template>
  <div class="footer">
    <hr />
    <div class="footer__top">
      <ul>
        <li v-for="{ name, path } in listLinks" :key="name">
          <NuxtLink :to="path">{{ name }}</NuxtLink>
        </li>
      </ul>
      <div class="footer__form">
        <InputField variant="black" placeholder="Enter your email" />
        <button class="footer__subscribe">
          <Icon name="icon:bar-outline" size="16" />
        </button>
      </div>
    </div>
    <div class="footer__bottom">
      <div>&copy; {{ new Date().getFullYear() }} My Company</div>
      <div class="footer__social">
        <NuxtLink v-for="{ name, path } in iconLinks" :key="name" :to="path">
          <Icon name="icon:bar-outline" size="30" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.footer {
  margin: 0 auto;
  max-width: 1248px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 0 16px;

  hr {
    border: none;
    border-block-end: 1px solid var(--color-gray);
    height: 1px;
  }

  & .footer__top {
    display: flex;
    padding: 16px 0;

    & ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      justify-content: center;
      gap: 30px;

      & a {
        text-decoration: none;
        font-size: 16px;
        font-weight: 400;
        text-transform: uppercase;
        color: var(--color-dark-gray);

        :hover {
          color: var(--color-black);
        }
      }
    }
  }

  & .footer__form {
    position: relative;

    & .footer__subscribe {
      position: absolute;
      top: 10px;
      right: 0;
      background: none;
      border: none;
      outline: none;
      /* font-size: 20px; */
      /* cursor: pointer; */
      /* color: var(--color-black); */
    }

    & input {
      min-width: 380px;
    }
  }

  & .footer__bottom {
    display: flex;
    justify-content: space-between;
    & .footer__social {
      display: flex;
      gap: 16px;

      a {
        color: var(--color-dark-gray);

        :hover {
          color: var(--color-black);
        }
      }
    }
  }
}
</style>
