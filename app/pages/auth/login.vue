<script setup lang="ts">
import type { ILoginResponse } from "~/interfaces/auth.interface";

definePageMeta({
  layout: "auth",
});

const API_URL = useAPI();
const email = ref<string | undefined>();
const password = ref<string | undefined>();
const authStore = useAuthStore();
const favoriteStore = useFavoriteStore();

async function login() {
  const data = await $fetch<ILoginResponse>(`${API_URL}/auth/login`, {
    method: "POST",
    body: {
      email: email.value,
      password: password.value,
    },
  });
  authStore.setToken(data.token);
  authStore.setEmail(data.user.email);
  await favoriteStore.restore(data.user.email);

  await navigateTo("/account");
  // try {
  //   const auth = useAuth();
  //   await auth.login({
  //     email: email.value!,
  //     password: password.value!,
  //   });
  //   await navigateTo("/");
  // } catch (error) {
  //   console.error("Login error:", error);
  //   alert("Login failed. Please check your credentials and try again.");
  // }
}
</script>

<template>
  <div>
    <h1>My account</h1>
    <form class="login-form">
      <div class="login-form__fields">
        <InputField v-model="email" variant="gray" placeholder="Email" />
        <InputField
          v-model="password"
          variant="gray"
          placeholder="Password"
          type="password"
        />
      </div>
      <div class="login-form__actions">
        <UiButton @click.stop.prevent="login">
          <span>Login</span>
        </UiButton>
        <NuxtLink to="/auth/restore">Forget Password?</NuxtLink>
      </div>
    </form>
  </div>
</template>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: 70px;
  max-width: 500px;
  margin: 0 auto;
  margin-top: 64px;

  & .login-form__fields {
    display: flex;
    flex-direction: column;
    gap: 46px;
  }

  & .login-form__actions {
    display: flex;
    flex-direction: column;
    gap: 13px;

    a {
      text-decoration: none;
      margin: 0 auto;
      color: var(--color-black);

      :hover {
        color: var(--color-black-hover);
      }
    }
  }
}
</style>
