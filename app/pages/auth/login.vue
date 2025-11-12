<script setup lang="ts">
definePageMeta({
  layout: "auth",
});
</script>

<template>
  <div>
    <h1>My account</h1>
    <form class="login-form">
      <div class="login-form__fields">
        <InputField variant="gray" placeholder="Email" />
        <InputField variant="gray" placeholder="Password" type="password" />
      </div>
      <div class="login-form__actions">
        <ActionButton>
          <span>Login</span>
        </ActionButton>
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
