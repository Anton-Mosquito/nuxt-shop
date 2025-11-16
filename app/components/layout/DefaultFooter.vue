<script setup lang="ts">
import { FOOTER_NAV_LINKS, SOCIAL_LINKS } from "~/constants/navigation";

const email = ref("");
const showSuccess = ref(false);

const handleSubscribe = () => {
  if (!email.value || !email.value.includes("@")) return;

  showSuccess.value = true;

  setTimeout(() => {
    showSuccess.value = false;
    email.value = "";
  }, 4000);
};
</script>

<template>
  <div class="footer">
    <hr />
    <div class="footer__top">
      <ul>
        <li v-for="{ name, path } in FOOTER_NAV_LINKS" :key="name">
          <NuxtLink :to="path">{{ name }}</NuxtLink>
        </li>
      </ul>
      <div class="footer__form">
        <UiInput
          v-model="email"
          variant="footer"
          placeholder="Your email for offers and news"
          type="email"
          icon="mdi:email-outline"
          @keyup.enter="handleSubscribe"
        />
        <button
          class="footer__subscribe"
          aria-label="subscribe"
          @click="handleSubscribe"
        >
          <Icon name="ic:sharp-arrow-right-alt" size="25" />
        </button>
      </div>
    </div>
    <UiNotification
      :show="showSuccess"
      message="Your email has been subscribed to news and notifications"
      variant="success"
      icon="mdi:check-circle"
    />
    <div class="footer__bottom">
      <div>&copy; {{ new Date().getFullYear() }} My Company</div>
      <div class="footer__social">
        <NuxtLink
          v-for="{ name, url, icon } in SOCIAL_LINKS"
          :key="name"
          :to="url"
          :title="name"
          target="_blank"
          rel="noopener noreferrer"
          external
        >
          <Icon :name="icon" size="30" />
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
  gap: 24px;
  padding: 20px 16px;

  hr {
    border: none;
    border-bottom: 1px solid var(--color-gray);
    height: 1px;
    margin: 0;
  }

  .footer__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    padding: 12px 0;
  }

  .footer__top ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 28px;
    align-items: center;
  }

  .footer__top a {
    text-decoration: none;
    text-transform: uppercase;
    color: var(--color-dark-gray);
    font-size: 14px;
    letter-spacing: 0.02em;
  }

  .footer__top a:hover {
    color: var(--color-black);
  }

  .footer__form {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 260px;
    justify-content: flex-end;
  }

  .footer__form input {
    min-width: 260px;
    border: none;
    border-bottom: 1px solid #000;
    background: transparent;
    padding: 6px 8px;
    font-size: 14px;
    outline: none;
  }

  .footer__form .footer__subscribe {
    background: none;
    border: none;
    padding: 6px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .footer__bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 8px;
  }

  .footer__bottom div {
    color: var(--color-dark-gray);
    font-size: 14px;
  }

  .footer__social {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  .footer__social a {
    color: var(--color-dark-gray);
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .footer__social a:hover {
    color: var(--color-black);
  }
}
</style>
